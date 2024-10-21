import { FC } from "react";

interface ReplyProps {
  id: number;
  content: string;
  createdAt: Date | null;
  userId: number;
  userName: string;
}

const Reply: FC<ReplyProps> = ({ content, createdAt, userName }) => {
  return (
    <div className="p-2 mb-2 ml-4 border-l-4 border-gray-400 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-600 font-bold">{userName}</span>
        {/* <div className="flex space-x-2">
          <ArrowUp className="text-green-600 cursor-pointer" />
          <span>0</span> 
          <ArrowDown className="text-red-600 cursor-pointer" />
        </div> */}
      </div>
      <p className="text-gray-600 mb-1">{content}</p>
      <span className="text-sm text-gray-400">
        {createdAt
          ? new Date(createdAt).toLocaleDateString()
          : "No date available"}
      </span>
    </div>
  );
};

export default Reply;
