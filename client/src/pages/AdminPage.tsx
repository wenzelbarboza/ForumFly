import {
  useAdminCommentsQuerry,
  useAdminPostsQuerry,
  useAdminRepliesQuerry,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useDeleteReplyMutation,
} from "../api/admin.api";
import { Button } from "../components/ui/button"; // Assuming Button component

const AdminPage = () => {
  const { data: posts, isLoading: postsLoading } = useAdminPostsQuerry();
  const { data: comments, isLoading: commentsLoading } =
    useAdminCommentsQuerry();
  const { data: replies, isLoading: repliesLoading } = useAdminRepliesQuerry();

  console.log("posts, comments and replies", posts, comments, replies);

  const deletePostMutation = useDeletePostMutation();
  const deleteCommentMutation = useDeleteCommentMutation();
  const deleteReplyMutation = useDeleteReplyMutation();

  if (postsLoading || commentsLoading || repliesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>

      {/* Posts Section */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold">Posts</h2>
        <ul>
          {posts?.map((post) => (
            <li key={post.id} className="mb-2 p-4 border rounded-md shadow-sm">
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

      {/* Comments Section */}
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

      {/* Replies Section */}
      <section>
        <h2 className="text-lg font-semibold">Replies</h2>
        <ul>
          {replies?.map((reply) => (
            <li key={reply.id} className="mb-2 p-4 border rounded-md shadow-sm">
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
    </div>
  );
};

export default AdminPage;
