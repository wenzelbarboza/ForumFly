import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import {
  allAdiminPosts,
  allAdmineComments,
  allAdminReplies,
} from "../types/api.return.types";

const userUrl = import.meta.env.VITE_BASE_URL + "/api/v1/admin";

// Fetch all posts
export const useAdminCommentsQuerry = () => {
  const handleQuerry = async () => {
    const res: AxiosResponse<allAdmineComments> = await axios.post(
      `${userUrl}/get-all-comments`
    );
    return res.data;
  };

  return useQuery({
    queryKey: ["get-all-comments"],
    queryFn: () => handleQuerry(),
  });
};

export const useAdminPostsQuerry = () => {
  const handleQuerry = async () => {
    const res: AxiosResponse<allAdiminPosts> = await axios.post(
      `${userUrl}/get-all-posts`
    );
    return res.data;
  };

  return useQuery({
    queryKey: ["get-all-posts"],
    queryFn: () => handleQuerry(),
  });
};

export const useAdminRepliesQuerry = () => {
  const handleQuerry = async () => {
    const res: AxiosResponse<allAdminReplies> = await axios.post(
      `${userUrl}/get-all-replies`
    );
    return res.data;
  };

  return useQuery({
    queryKey: ["get-all-replies"],
    queryFn: () => handleQuerry(),
  });
};

// Delete a post
type deletePostProps = {
  postId: number;
};
export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  const handelMutation = async (data: deletePostProps) => {
    console.log("data inside delete mutation:", data);
    const res = await axios.delete(`${userUrl}/delete-post`, { data });
    return res.data;
  };
  return useMutation({
    mutationFn: handelMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-post"] });
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] });
    },
  });
};

type deleteCommentsProps = {
  commentId: number;
};
export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  const handelMutation = async (data: deleteCommentsProps) => {
    const res = await axios.delete(`${userUrl}/delete-comment`, { data });
    return res.data;
  };
  return useMutation({
    mutationFn: handelMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-comments"] });
      queryClient.invalidateQueries({ queryKey: ["get-all-comments"] });
    },
  });
};

type DeleteReplyMutation = {
  replyId: number;
};
export const useDeleteReplyMutation = () => {
  const queryClient = useQueryClient();
  const handelMutation = async (data: DeleteReplyMutation) => {
    const res = await axios.delete(`${userUrl}/delete-reply`, { data });
    return res.data;
  };
  return useMutation({
    mutationFn: handelMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-reply"] });
      queryClient.invalidateQueries({ queryKey: ["get-all-replies"] });
    },
  });
};
