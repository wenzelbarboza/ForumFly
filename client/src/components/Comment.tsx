import { FC, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetReplyQuerry } from "../api/reply.api"; // Assuming this is the correct query hook to fetch replies
import Reply from "./Reply";
import AddReplyDrawer from "./AddReplyDrawer";
import { useVoteCommentMutation } from "../api/comments.api";

interface CommentProps {
  id: number;
  content: string;
  createdAt: Date | null;
  upvotes: number;
  downvotes: number;
  replyCount: number;
  userName: string;
  userId: number;
  postId: number;
}

const Comment: FC<CommentProps> = ({
  id,
  content,
  userId,
  upvotes,
  downvotes,
  replyCount = 0,
  postId,
  userName,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const querryclient = useQueryClient();
  const { mutateAsync } = useVoteCommentMutation();

  console.log("-----------------");
  console.log("userId and commentId: ", userId, id);

  const {
    data: repliesData,
    isLoading,
    isError,
  } = useGetReplyQuerry({ commentId: id, userId, postId });

  const replies = repliesData?.data;

  const commentVotes = upvotes - downvotes;

  const handleShowReplies = () => {
    setShowReplies((prev) => !prev); // Toggle show replies state
  };

  const handleCommentVotes = async (vote: boolean) => {
    console.log("this is a vote in comment {commentId}", id);
    try {
      await mutateAsync({ upVote: vote, commentId: id, postId, userId });
      await querryclient.refetchQueries({ queryKey: ["get-comments"] });
      // await refetchPost();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 mb-2 border-l-4 border-blue-500 bg-gray-100 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 font-bold">{userName}</span>

        <div className="flex items-center space-x-1">
          <ArrowUp
            onClick={() => handleCommentVotes(true)}
            className="text-green-600 hover:cursor-pointer"
          />
          <span>{commentVotes}</span>
          <ArrowDown
            onClick={() => handleCommentVotes(false)}
            className="text-red-600 hover:cursor-pointer"
          />
        </div>
      </div>
      <p className="text-gray-700 mb-2">{content}</p>

      <AddReplyDrawer commentId={id} userId={userId} />

      {/* Show the reply count and button to toggle replies */}
      <div className="text-sm text-gray-500">
        <button onClick={handleShowReplies} className="underline">
          {showReplies ? "Hide Replies" : `Show Replies (${replyCount})`}
        </button>
      </div>

      {/* Conditionally render replies if `showReplies` is true */}
      {showReplies && (
        <div className="ml-4 mt-2">
          {isLoading ? (
            <p>Loading replies...</p>
          ) : isError ? (
            <p>Error loading replies</p>
          ) : replies && replies.length > 0 ? (
            replies.map((reply, index) => {
              return (
                <Reply
                  key={index}
                  content={reply.content}
                  createdAt={reply.createdAt}
                  id={reply.id}
                  userId={userId}
                  userName={userName}
                />
              );
            })
          ) : (
            <p>No replies found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
