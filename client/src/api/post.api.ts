import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import axiosInstance from "../lib/utils";
import {
  apiResponeType,
  postType,
  singlePostType,
  UserPostType,
} from "../types/api.return.types";

const userUrl = import.meta.env.VITE_BASE_URL + "/api/v1/posts";

export type postInptype = {
  userId: number;
};

export const useGetPostQuerry = (data: postInptype) => {
  const handleQuery = async (data: postInptype) => {
    const res: AxiosResponse<apiResponeType<postType>> =
      await axiosInstance.post(`${userUrl}/get-posts`, data);
    return res.data;
  };

  return useQuery({
    queryKey: ["get-post", data],
    queryFn: () => handleQuery(data),
  });
};

export type singlePostInptype = {
  userId: number;
  postId: number;
};

export const useGetSinglePostQuerry = (data: singlePostInptype) => {
  const handleQuery = async (data: singlePostInptype) => {
    const res: AxiosResponse<apiResponeType<singlePostType>> =
      await axiosInstance.post(`${userUrl}/get-single-post`, data);
    return res.data;
  };

  return useQuery({
    queryKey: ["get-single-post", data],
    queryFn: () => handleQuery(data),
  });
};

type CreatePost = {
  userId: number;
  title: string;
  content: string;
};

export const useCreatePostMutation = () => {
  const handleMutation = async (data: CreatePost) => {
    const res = await axiosInstance.post(`${userUrl}/create-post`, data);
    return res.data;
  };

  return useMutation({
    mutationKey: ["create-post"],
    mutationFn: (data: CreatePost) => handleMutation(data),
  });
};

type VotePost = {
  userId: number;
  postId: number;
  upVote: boolean;
};

export const useVotePostMutation = () => {
  const handelMutation = async (data: VotePost) => {
    const res = await axiosInstance.post(`${userUrl}/vote-post`, data);
    return res.data;
  };

  return useMutation({
    mutationFn: handelMutation,
  });
};

type DeletePost = {
  userId: number;
  postId: number;
};

export const useDeletePostMutation = () => {
  const handelMutation = async (data: DeletePost) => {
    const res = await axios.delete(`${userUrl}/delete-post`, { data });
    return res.data;
  };

  return useMutation({
    mutationKey: ["delete-post"],
    mutationFn: handelMutation,
  });
};

export type GetSingleUserPost = {
  userId: number;
};

export const useGetUserPostQuerry = (data: GetSingleUserPost) => {
  const handleQuery = async (data: GetSingleUserPost) => {
    const res: AxiosResponse<apiResponeType<UserPostType>> =
      await axiosInstance.post(`${userUrl}/get-user-post`, data);
    return res.data;
  };

  return useQuery({
    queryKey: ["get-user-post", data],
    queryFn: () => handleQuery(data),
  });
};
