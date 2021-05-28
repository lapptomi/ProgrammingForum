export interface IUser {
  email: string;
  username: string;
}

export interface IPost {
  id: number;
  original_poster: IUser;
  likers: Array<IUser>;
  likeCount: number;
  title: string;
  description: string;
}

export interface IComment {
  id: string;
  comment_writer: IUser;
  comment: string;
  likers: Array<IUser>;
  likeCount: number;
}
