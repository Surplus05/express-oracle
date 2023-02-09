export interface SignIn {
  mail: string;
  pw: string;
}
export interface SignUp {
  mail: string;
  pw: string;
  username: string;
}

export interface WritePost {
  writerId: number;
  title: string;
  post: string;
}

export interface EditPost {
  title: string;
  post: string;
  postId: number;
}

export interface UserState {
  USER_ID: number;
}

export interface WriteComment {
  postId: number;
  userId: number;
  text: string;
}

export interface CommentType {
  USERNAME: string;
  PUBLISHED: string;
  COMMENT_TEXT: string;
}

export interface PostStatistic {
  like: number;
  dislike: number;
}

export interface PostType {
  COMMENTS: number;
  DISLIKES: number;
  LIKES: number;
  POST: string;
  POST_ID: number;
  PUBLISHED: string;
  TITLE: string;
  USERNAME: string;
  USER_ID: number;
  VIEWS: number;
}

export interface PostHeader {
  PUBLISHED: string;
  TITLE: string;
  USERNAME: string;
  VIEWS: number;
  COMMENTS: number;
  LIKES: number;
}
