export type user = {
  id: number;
  idToken: string;
  name: string;
  role: string | null;
};

export type apiResponeType<T = unknown> = {
  success: true;
  message: "Registration successfull";
  data?: T;
};

//post

export type postType = {
  posts: {
    id: number;
    title: string;
    content: string;
    createdAt: Date | null;
    upvotes: number;
    downvotes: number;
    commentCount: number;
  }[];
  currentPage: number;
  totalPages: number;
};

export type singlePostType = {
  id: number;
  title: string;
  content: string;
  createdAt: Date | null;
  upvotes: number;
  downvotes: number;
};

export type UserPostType = {
  id: number;
  title: string;
  content: string;
  createdAt: Date | null;
}[];

//comment
export type CommentsType = {
  id: number;
  content: string;
  createdAt: Date | null;
  upvotes: number;
  downvotes: number;
  replyCount: number;
}[];

//reply
export type replyType = {
  id: number;
  createdAt: Date | null;
  userId: number;
  content: string;
  commentId: number;
}[];
