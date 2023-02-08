export default interface ArticleInListType {
  COMMENTS: number;
  LIKES: number;
  NUM: number;
  POST_ID: number;
  PUBLISHED: string;
  TITLE: string;
  USERNAME: string;
  USER_ID: number;
  VIEWS: number;
  WRITER_ID: number;
}

export interface SignInTypes {
  mail: string;
  pw: string;
}
export interface SignUpTypes {
  mail: string;
  pw: string;
  username: string;
}

export interface WritePostTypes {
  writerId: number;
  title: string;
  post: string;
}

export interface EditPostTypes {
  title: string;
  post: string;
  postId: number;
}

export interface userState {
  USER_ID: number;
}

export interface WriteCommentTypes {
  postId: number;
  userId: number;
  text: string;
}
