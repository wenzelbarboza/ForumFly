// src/pages/Home.tsx

import { FC } from "react";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
// import PostCard from "";

const FeedPage: FC = () => {
  const navigate = useNavigate();
  const posts = [
    { id: 1, title: "Post 1", upvotes: 120, commentsCount: 34 },
    { id: 2, title: "Post 2", upvotes: 89, commentsCount: 21 },
    // Add more dummy posts for now
  ];

  const handleNavigate = (id: number) => {
    if (!id) {
      alert("id not sent");
      return;
    }

    navigate(`/post/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {posts.map((post) => (
        <div onClick={() => handleNavigate(post.id)} key={post.id}>
          <PostCard
            id={post.id}
            title={post.title}
            upvotes={post.upvotes}
            commentsCount={post.commentsCount}
          />
        </div>
      ))}
    </div>
  );
};

export default FeedPage;
