import { ReactNode } from "react";
import { useUserStore } from "../zustand/UserStore";
import { Navigate } from "react-router-dom";

type props = { children: ReactNode };

export const ProtectedRoute = ({ children }: props) => {
  const user = useUserStore((state) => state.user);
  console.log("inside protected user is: ", user);
  if (user == null) {
    return <Navigate to={"/"} />;
  }
  return children;
};
