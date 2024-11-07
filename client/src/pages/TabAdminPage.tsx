import { useState } from "react";
import {
  useAdminCommentsQuerry,
  useAdminPostsQuerry,
  useAdminRepliesQuerry,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useDeleteReplyMutation,
} from "../api/admin.api";
import { Button } from "../components/ui/button";

export const TabAdminPage = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const { data: posts, isLoading: postsLoading } = useAdminPostsQuerry();
  const { data: comments, isLoading: commentsLoading } =
    useAdminCommentsQuerry();
  const { data: replies, isLoading: repliesLoading } = useAdminRepliesQuerry();

  const deletePostMutation = useDeletePostMutation();
  const deleteCommentMutation = useDeleteCommentMutation();
  const deleteReplyMutation = useDeleteReplyMutation();

  if (postsLoading || commentsLoading || repliesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex mb-6">
        <button
          className={`px-4 py-2 mr-2 ${
            activeTab === "posts" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
        <button
          className={`px-4 py-2 mr-2 ${
            activeTab === "comments" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("comments")}
        >
          Comments
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "replies" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("replies")}
        >
          Replies
        </button>
      </div>

      {/* Render active tab content */}
      {activeTab === "posts" && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold">Posts</h2>
          <ul>
            {posts?.map((post) => (
              <li
                key={post.id}
                className="mb-2 p-4 border rounded-md shadow-sm"
              >
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <Button
                  variant="destructive"
                  onClick={() => deletePostMutation.mutate({ postId: post.id })}
                >
                  Delete Post
                </Button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === "comments" && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold">Comments</h2>
          <ul>
            {comments?.map((comment) => (
              <li
                key={comment.id}
                className="mb-2 p-4 border rounded-md shadow-sm"
              >
                <p>{comment.content}</p>
                <Button
                  variant="destructive"
                  onClick={() =>
                    deleteCommentMutation.mutate({ commentId: comment.id })
                  }
                >
                  Delete Comment
                </Button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === "replies" && (
        <section>
          <h2 className="text-lg font-semibold">Replies</h2>
          <ul>
            {replies?.map((reply) => (
              <li
                key={reply.id}
                className="mb-2 p-4 border rounded-md shadow-sm"
              >
                <p>{reply.content}</p>
                <Button
                  variant="destructive"
                  onClick={() =>
                    deleteReplyMutation.mutate({ replyId: reply.id })
                  }
                >
                  Delete Reply
                </Button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
