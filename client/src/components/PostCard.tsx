import { FC } from "react";
import { ArrowUp, ArrowDown, MessageSquare } from "lucide-react";

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  upvotes: number;
  commentsCount: number;
}

const PostCard: FC<PostCardProps> = ({
  id,
  title,
  content,
  upvotes,
  commentsCount,
}) => {
  return (
    <div className="p-4 mb-4 border rounded-lg bg-white shadow hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1">
            <ArrowUp className="text-green-600" />
            <span>{upvotes}</span>
            <ArrowDown className="text-red-600" />
          </div>
          <div className="flex items-center space-x-1">
            <MessageSquare />
            <span>{commentsCount} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
