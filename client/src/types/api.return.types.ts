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

// export type postType = {
//   posts: {
//     id: number;
//     title: string;
//     content: string;
//     createdAt: Date | null;
//     upvotes: number;
//     downvotes: number;
//     commentCount: number;
//   }[];
//   currentPage: number;
//   totalPages: number;
// };

export type postType = {
  posts: {
    id: number;
    title: string;
    content: string;
    createdAt: Date | null;
    commentCount: number;
  }[];
  votes: {
    postId: number;
    upvotes: number;
    downvotes: number;
  }[];
  currentPage: number;
  totalPages: number;
};

// export type singlePostType = {
//   id: number;
//   title: string;
//   content: string;
//   createdAt: Date | null;
//   upvotes: number;
//   downvotes: number;
// };

export type singlePostType = {
  post: {
    id: number;
    title: string;
    content: string;
    createdAt: Date | null;
  };
  votes: {
    upvotes: number;
    downvotes: number;
  };
};

export type UserPostType = {
  id: number;
  title: string;
  content: string;
  createdAt: Date | null;
}[];

//comment
// export type CommentsType = {
//   id: number;
//   content: string;
//   createdAt: Date | null;
//   upvotes: number;
//   downvotes: number;
//   replyCount: number;
// }[];
export type CommentsType = {
  postComments: {
    id: number;
    content: string;
    createdAt: Date | null;
    upvotes: number;
    downvotes: number;
  }[];
  replyCount: {
    replyCount: number;
    commentsId: never;
  }[];
};

//reply
export type replyType = {
  userId: number;
  commentId: number;
  postId: number | null;
  id: number;
  createdAt: Date | null;
  content: string;
}[];

// admin
export type allAdiminPosts = {
  userId: number;
  content: string;
  title: string;
  id: number;
  createdAt: Date | null;
  verification: "pending" | "verified" | null;
}[];

export type allAdmineComments = {
  userId: number;
  postId: number;
  content: string;
  id: number;
  createdAt: Date | null;
}[];

export type allAdminReplies = {
  userId: number;
  postId: number | null;
  content: string;
  id: number;
  createdAt: Date | null;
  commentId: number;
}[];
