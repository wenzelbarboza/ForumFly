import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useUserStore } from "../zustand/UserStore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FaUser } from "react-icons/fa";

export const Header = () => {
  const userStore = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("logout successfully");
      userStore.setUser(null);
      // setAccessToken(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginNavigate = () => {
    navigate("/login");
  };

  const handleMyPostsNavigation = () => {
    navigate("/my-posts");
  };

  return (
    <>
      <nav className="w-full py-4 flex items-center justify-between">
        <div className=" max-w-12">
          <Link to={"/"}>
            {/* <img src="./logo.png" className="h-full w-full" alt="" /> */}
            <span className="font-bold text-xl">FormFly</span>
          </Link>
        </div>
        <div className="flex justify-between items-center gap-2  ">
          {userStore.user && (
            <Button onClick={handleMyPostsNavigation} variant={"outline"}>
              <FaUser className="text-2xl" />
            </Button>
          )}

          {userStore.user && <Button onClick={handleLogout}>Log out</Button>}
        </div>
      </nav>
    </>
  );
};
