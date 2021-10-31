export interface IUser {
  email: string;
  username: string;
}

export interface IPost {
  id: number;
  original_poster: IUser;
  likers: Array<IUser>;
  title: string;
  description: string;
  created_at: string;
}

export interface IComment {
  id: string;
  comment_writer: IUser;
  comment: string;
  likers: Array<IUser>;
  likeCount: number;
  created_at: string;
}
