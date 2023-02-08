export default interface GetArticleListTypes {
  page: number;
}

export interface GetIsDuplicateTypes {
  email?: string;
  username?: string;
}

export interface SignInTypes {
  mail: string;
  pw: string;
}
export interface SignUpTypes extends SignInTypes {
  username: string;
}

export interface SocialTypes {
  postId: number;
  like: boolean;
}

export interface CommentTypes {
  postId: number;
  userId: number;
  text: string;
}

export interface EditPostTypes {
  title: string;
  post: string;
  postId: number;
}
