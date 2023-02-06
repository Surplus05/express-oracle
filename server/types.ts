export default interface GetArticleListTypes {
  page: number;
}

export interface GetIsDuplicateTypes {
  email?: string;
  username?: string;
}

export interface PostUserInfoTypes {
  mail: string;
  pw: string;
  username: string;
}
