import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useLoginMutation } from "../api/user.api";
import { useUserStore } from "../zustand/UserStore";
import { FaGoogle } from "react-icons/fa";
import {
  GoogleAuthProvider,
  OAuthCredential,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
  const userStore = useUserStore();
  const provider = new GoogleAuthProvider();
  const { mutateAsync: LoginAsync } = useLoginMutation();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(
        result
      ) as OAuthCredential;
      const accessToken = credential.accessToken;
      const user = result.user;

      const token = credential.idToken || "";
      const email = user.email || "";
      const name = user.displayName || "";
      console.log("signed up user is: ", user);
      try {
        const dbUser = await LoginAsync({
          email,
          token,
          name,
        });

        userStore.setUser({
          name: dbUser.data?.name as string,
          role: dbUser.data?.type ?? null,
          //id from the server
          id: dbUser.data?.id as number,
          idToke: token,
        });

        // TODO
        // check if aproved if approved then navigate to home
        // else to
        // wait for approval page
        navigate("/");
      } catch (error: any) {
        //signout the user
        await signOut(auth);
        console.log("user logged out automatically");
        throw new Error("error in user registration in server");
        console.log(error);
      }
    } catch (error: any) {
      console.log(error.message || "error in google sigin", error);
    } finally {
      userStore.setLoading(false);
    }
  };

  return (
    <>
      <div className="flex-1 flex justify-center items-center">
        <Card className="sm:w-80">
          <CardHeader>
            <CardTitle>Sign in </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={handleSignIn}>
              sign in with google <FaGoogle className="ml-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
