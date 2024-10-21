import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useEffect } from "react";
import { useUserStore } from "../zustand/UserStore";
import { Toaster } from "../components/ui/toaster";
import MoonLoader from "react-spinners/MoonLoader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { apiResponeType } from "../types/api.return.types";

const userUrl = import.meta.env.VITE_BASE_URL + "/api/v1/user";
type userResponse = {
  name: string;
  email: string;
  type: "user" | "admin" | null;
  id: number;
  createdAt: Date | null;
};
//TODO fix grid layout
export const LayOut = () => {
  const userStore = useUserStore();
  const querryclient = useQueryClient();

  const fetchuser = async (email: string) => {
    const res: AxiosResponse<apiResponeType<userResponse>> = await axios.post(
      `${userUrl}/get-user`,
      {
        email,
      }
    );
    return res.data;
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userdata = await querryclient.fetchQuery({
            queryKey: ["user", user.uid],
            queryFn: () => fetchuser(user.email as string),
          });
          const idToken = (await user.getIdToken()) as string;

          console.log("user data in layout: ", userdata);

          const data = userdata.data;

          userStore.setUser({
            id: data?.id as number,
            idToken,
            name: data?.name as string,
            role: data?.type as string,
          });
          userStore.setLoading(false);
        } else {
          userStore.setUser(null);
          userStore.setLoading(false);
          console.log("this is user store: ", userStore);
        }
      } catch (error) {
        console.log(error);
      }
    });
    return () => {};
  }, []);

  return (
    <>
      <div>
        <div className="grid-background "></div>
        <main className="min-h-screen container flex flex-col">
          <div className="">
            <Header />
          </div>
          <div className=" border-green-400 flex flex-col flex-1">
            {/* {userStore.loading ? <MoonLoader color={"#A9A9A9"} /> : <Outlet />} */}
            <Outlet />
          </div>
        </main>
        <div className="p-10 text-center bg-gray-800">footer</div>
        <Toaster />
      </div>
    </>
  );
};
