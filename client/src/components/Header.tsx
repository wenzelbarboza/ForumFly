import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { LogIn } from "../pages/LogIn";
import { useUserStore } from "../zustand/UserStore";
import { logoutUser } from "../lib/auth";
import { PenBox } from "lucide-react";
import { role } from "../types/type";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const Header = () => {
  const accessToken = useUserStore((state) => state.accessToken);
  const userStore = useUserStore();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setAccessToken = useUserStore((state) => state.setAccessToken);

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
          {userStore.user?.role == role.recruiter && (
            <Link to="/post-job">
              <Button variant="destructive" className="rounded-full">
                <PenBox size={20} className="mr-2" />
                Post a Job
              </Button>
            </Link>
          )}
          <Button onClick={handleLogout}>Log out</Button>
          {accessToken ? (
            <Button onClick={handleLogout}>logout</Button>
          ) : (
            <Button onClick={handleLoginNavigate}>Login</Button>
          )}
        </div>
      </nav>
    </>
  );
};
