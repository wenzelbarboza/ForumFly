import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useEffect } from "react";
import { useUserStore } from "../zustand/UserStore";
import { Toaster } from "../components/ui/toaster";
import MoonLoader from "react-spinners/MoonLoader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
//TODO fix grid layout
export const LayOut = () => {
  const userStore = useUserStore();

  // useEffect(() => {
  //   refreshAccessToken()
  //     .then((data) => {
  //       userStore.setAccessToken(data.accessToken);
  //       const decoded = jwtDecode<payloadType>(data.accessToken);
  //       console.log("the access token fetched just now is: ", decoded);
  //       userStore.setUser({
  //         name: decoded.name,
  //         role: decoded.role ?? null,
  //         id: decoded.userId,
  //       });
  //       console.log("userStore", userStore);
  //     })

  //     .catch((error) => {
  //       console.error(error);
  //     })

  //     .finally(() => {
  //       userStore.setLoading(false);
  //     });
  // }, []);

  //-----------new code--------------

  // const querryclient = usequeryclient();

  // const fetchuser = () => {
  //   const res = await axios.get();
  //   return;
  // };

  // useeffect(() => {
  //   onauthstatechanged(auth, async (user) => {
  //     try {
  //       if (user) {
  //         const userdata = await querryclient.fetchquery({
  //           querykey: ["user", user.uid],
  //           queryfn: () => fetchuser(user.uid),
  //         });

  //         userstore.setuser(userdata);
  //         userstore.setloading(false);
  //       } else {
  //         userstore.setuser(null);
  //         userstore.setloading(false);
  //         console.log("this is user store: ", userstore);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  //   return () => {};
  // }, []);

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
