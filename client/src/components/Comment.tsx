// src/components/Comment.tsx

import { FC } from "react";
import { ArrowUp, ArrowDown, MessageSquare } from "lucide-react";

interface CommentProps {
  author: string;
  content: string;
  upvotes: number;
  replies?: CommentProps[]; // Nested replies
}

const Comment: FC<CommentProps> = ({ author, content, upvotes, replies }) => {
  return (
    <div className="p-4 mb-2 border-l-4 border-blue-500 bg-gray-100 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 font-bold">{author}</span>
        <div className="flex space-x-2">
          <ArrowUp className="text-green-600" />
          <span>{upvotes}</span>
          <ArrowDown className="text-red-600" />
        </div>
      </div>
      <p className="text-gray-700 mb-2">{content}</p>
      {replies && replies.length > 0 && (
        <div className="ml-4">
          {replies.map((reply, index) => (
            <Comment key={index} {...reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
