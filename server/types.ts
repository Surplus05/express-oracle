export interface UserInfo {
  email?: string;
  username?: string;
}

export interface SignInInfo {
  mail: string;
  pw: string;
}

export interface SignUpInfo extends SignInInfo {
  username: string;
}

export interface Comment {
  postId: number;
  userId: number;
  text: string;
}

export interface EditPost {
  title: string;
  post: string;
  postId: number;
}

export interface DBConfig {
  user: string;
  password: string;
  connectString: string;
}

export interface WritePost {
  writerId: number;
  title: string;
  post: string;
}
