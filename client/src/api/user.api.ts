import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../lib/utils";
import {
  apiResponeType,
  loginType,
  roleApiType,
  signUpType,
} from "../types/api.types";
import axios, { AxiosResponse } from "axios";

const userUrl = import.meta.env.VITE_BASE_URL + "/api/v1/user";

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

export const useRoleMutate = () => {
  const handelMutation = async (data: roleApiType) => {
    console.log("data received inside querry mutate: ", data);
    const res: AxiosResponse<apiResponeType> = await axiosInstance.post(
      `${userUrl}/role`,
      data
    );
    return res.data;
  };

  return useMutation({
    mutationKey: ["update role"],
    mutationFn: handelMutation,
  });
};
