import { useMutation } from "@tanstack/react-query";
import { apiResponeType } from "../types/api.return.types";
import axios, { AxiosResponse } from "axios";

const userUrl = import.meta.env.VITE_BASE_URL + "/api/v1/user";

export type loginType = {
  email: string;
  token: string;
  name: string;
};

export type signUpType = {
  name: string;
  email: string;
  type: "user" | "admin" | null;
  id: number;
  createdAt: Date | null;
};

export const useLoginMutation = () => {
  const handelMutation = async ({ email, token, name }: loginType) => {
    const res: AxiosResponse<apiResponeType<signUpType>> = await axios.post(
      `${userUrl}/signup`,
      {
        email,
        name,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  };

  return useMutation({
    mutationKey: ["Login"],
    mutationFn: handelMutation,
  });
};

// export const useSignUpMutation = () => {

//   const handelMutation = async (signUpData: signUpType) => {
//     const res: AxiosResponse<apiResponeType> = await axiosInstance.post(
//       `${userUrl}/signup`,
//       signUpData
//     );
//     return res.data;
//   };

//   return useMutation({
//     mutationKey: ["signUp"],
//     mutationFn: handelMutation,
//   });
// };
