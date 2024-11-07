// src/pages/Home.tsx

import { FC } from "react";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import { useGetPostQuerry } from "../api/post.api";
import { useUserStore } from "../zustand/UserStore";
import AddPostDrawer from "../components/AddPostDrawer";
// import PostCard from "";

const FeedPage: FC = () => {
  const navigate = useNavigate();
  // const posts = [
  //   { id: 1, title: "Post 1", upvotes: 120, commentsCount: 34 },
  //   { id: 2, title: "Post 2", upvotes: 89, commentsCount: 21 },
  //   // Add more dummy posts for now
  // ];

  const userStore = useUserStore();

  const {
    isLoading,
    data: postsData,
    isError,
  } = useGetPostQuerry({
    userId: userStore.user?.id as number,
  });

  const handleNavigate = (id: number) => {
    if (!id) {
      alert("id not sent");
      return;
    }

    navigate(`/post/${id}`);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error in loading posts.</h2>;
  }

  return (
    <div className="container mx-auto p-4 flex-1 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <AddPostDrawer userId={userStore.user?.id as number} />
      {postsData?.data?.posts.map((post) => {
        const votes = postsData.data?.votes.find(
          (vote) => vote.postId == post.id
        );
        return (
          <div onClick={() => handleNavigate(post.id)} key={post.id}>
            <PostCard
              content={post.content}
              id={post.id}
              title={post.title}
              // upvotes={post.upvotes}
              upvotes={votes?.upvotes || 0}
              commentsCount={post.commentCount}
              photoUrl={post.photoUrl}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FeedPage;
