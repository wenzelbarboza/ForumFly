// src/pages/PostPage.tsx

import { FC } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";
import { useGetSinglePostQuerry, useVotePostMutation } from "../api/post.api";
import { useUserStore } from "../zustand/UserStore";
import { useGetCommentsQuerry } from "../api/comments.api";
import AddCommentDrawer from "../components/AddCommentDrawer";
import { ArrowDown, ArrowUp } from "lucide-react";

const PostPage: FC = () => {
  const { id } = useParams();
  const postId = Number(id);
  const userId = useUserStore((state) => state.user?.id) as number;
  const userName = useUserStore((state) => state.user?.name) as string;

  const { mutateAsync } = useVotePostMutation();

  const {
    data: postDatat,
    isLoading: isPostLoading,
    isError: isPostError,
    refetch: refetchPost,
  } = useGetSinglePostQuerry({ postId, userId });

  const post = postDatat?.data?.post;
  const postVote = postDatat?.data?.votes;

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useGetCommentsQuerry({ postId, userId });

  const comments = commentsData?.data?.postComments;
  const replyCount = commentsData?.data?.replyCount;

  console.log("reply count ", replyCount);

  const handlePostVote = async (vote: boolean) => {
    try {
      await mutateAsync({ upVote: vote, postId, userId });
      await refetchPost();
    } catch (error: any) {
      console.error(error);
    }
  };

  const postVotes = (postVote?.upvotes || 0) - (postVote?.downvotes || 0);

  if (isPostError) {
    return <h2>Error in loading post.</h2>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{post?.title}</h1>
      {isPostLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div className="mb-8">
            <p className="mb-4">{post?.content}</p>
            <div className="flex items-center space-x-1">
              <ArrowUp
                onClick={() => handlePostVote(true)}
                className="text-green-600 hover:cursor-pointer"
              />
              <span>{postVotes}</span>
              <ArrowDown
                onClick={() => handlePostVote(false)}
                className="text-red-600 hover:cursor-pointer"
              />
            </div>
          </div>
        </>
      )}
      <div>
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <AddCommentDrawer postId={postId} userId={userId} />
        {isCommentsLoading ? (
          <h2>Loading...</h2>
        ) : isCommentsError ? (
          <h2>Error in loading comments</h2>
        ) : comments?.length ? (
          comments?.map((comment, index) => {
            const reply = replyCount?.find(
              (item) => item.commentsId == comment.id
            );
            return (
              <Comment
                key={index}
                {...comment}
                replyCount={reply?.replyCount as number}
                userId={userId}
                userName={userName}
                postId={postId}
              />
            );
          })
        ) : (
          <h2>No comments Found.</h2>
        )}
      </div>
    </div>
  );
};

export default PostPage;
