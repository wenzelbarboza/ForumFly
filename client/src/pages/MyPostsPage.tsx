import { FC } from "react";
import { useDeletePostMutation, useGetUserPostQuerry } from "../api/post.api";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useUserStore } from "../zustand/UserStore";

const MyPostsPage: FC = () => {
  const userId = useUserStore((state) => state.user?.id) as number; // Assume userId is stored in Zustand state
  const queryClient = useQueryClient();

  const {
    data: postsData,
    isLoading,
    error,
  } = useGetUserPostQuerry({ userId });
  const posts = postsData?.data;
  const deletePostMutation = useDeletePostMutation();

  const [deletingPostId, setDeletingPostId] = useState<number | null>(null);

  const handleDelete = async (postId: number) => {
    setDeletingPostId(postId);
    try {
      await deletePostMutation.mutateAsync({ postId, userId });
      await queryClient.invalidateQueries({ queryKey: ["get-user-post"] });
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setDeletingPostId(null);
    }
  };

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error loading posts</div>;
  }

  console.log("posts are: ", postsData);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Posts</h1>
      {posts?.length === 0 ? (
        <p>You haven't created any posts yet.</p>
      ) : (
        <ul>
          {posts?.map((post: any) => (
            <li key={post.id} className="mb-4 p-4 border rounded-md shadow-sm">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.content}</p>
              <p className="text-gray-500 text-sm">
                Posted on {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-2">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(post.id)}
                  disabled={deletingPostId === post.id}
                >
                  {deletingPostId === post.id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPostsPage;
