import { AxiosResponse } from "axios";
import { apiResponeType, CommentsType } from "../types/api.return.types";
import axiosInstance from "../lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

const userUrl = import.meta.env.VITE_BASE_URL + "/api/v1/comment";

type GetComments = {
  userId: number;
  postId: number;
};

export const useGetCommentsQuerry = (data: GetComments) => {
  const handleQuerry = async () => {
    const res: AxiosResponse<apiResponeType<CommentsType>> =
      await axiosInstance.post(`${userUrl}/get-comments`, data);
    return res.data;
  };

  return useQuery({
    queryKey: ["get-comments"],
    queryFn: () => handleQuerry(),
  });
};

type PostComment = {
  userId: number;
  content: string;
  postId: number;
};

export const usePostCommentMutation = () => {
  const handleMutation = async (data: PostComment) => {
    const res = await axiosInstance.post(`${userUrl}/post-comment`, data);
    return res.data;
  };

  return useMutation({
    mutationKey: ["post-comment"],
    mutationFn: (data: PostComment) => handleMutation(data),
  });
};

type VoteComment = {
  userId: number;
  postId: number;
  commentId: number;
  upVote: boolean;
};

export const useVoteCommentMutation = () => {
  const handleQuerry = async (data: VoteComment) => {
    const res = await axiosInstance.post(`${userUrl}/vote-comment`, data);
    return res.data;
  };

  return useMutation({
    mutationKey: ["vote-comment"],
    mutationFn: handleQuerry,
  });
};
