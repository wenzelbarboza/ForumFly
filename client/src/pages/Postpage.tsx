// src/pages/PostPage.tsx

import { FC } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";

const PostPage: FC = () => {
  const { id } = useParams();

  const post = {
    id: Number(id),
    title: `Post ${id} Title`,
    content: `This is the detailed content of post ${id}.`,
    comments: [
      {
        author: "User1",
        content: "This is the first comment.",
        upvotes: 12,
        replies: [{ author: "User2", content: "This is a reply.", upvotes: 3 }],
      },
      {
        author: "User3",
        content: "This is the second comment.",
        upvotes: 8,
        replies: [],
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="mb-8">{post.content}</p>

      <div>
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        {post.comments.map((comment, index) => (
          <Comment key={index} {...comment} />
        ))}
      </div>
    </div>
  );
};

export default PostPage;
