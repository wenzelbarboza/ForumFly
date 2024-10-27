import { AxiosResponse } from "axios";
import { apiResponeType, replyType } from "../types/api.return.types";
import axiosInstance from "../lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

const userUrl = import.meta.env.VITE_BASE_URL + "/api/v1/reply";

type GetReply = {
  userId: number;
  commentId: number;
  postId: number;
};
export const useGetReplyQuerry = (data: GetReply) => {
  const handleQuerry = async () => {
    const res: AxiosResponse<apiResponeType<replyType>> =
      await axiosInstance.post(`${userUrl}/get-reply`, data);
    return res.data;
  };

  return useQuery({
    queryKey: ["get-reply", data],
    queryFn: () => handleQuerry(),
  });
};

type PostReply = {
  userId: number;
  content: string;
  commentId: number;
};

export const usePostReplyMutation = () => {
  const handleMutation = async (data: PostReply) => {
    const res = await axiosInstance.post(`${userUrl}/post-reply`, data);
    return res.data;
  };

  return useMutation({
    mutationKey: ["post-reply"],
    mutationFn: (data: PostReply) => handleMutation(data),
  });
};
