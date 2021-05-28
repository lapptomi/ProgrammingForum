export interface IUser {
  email: string;
  username: string;
}

export interface IPost {
  id: number;
  original_poster: IUser;
  likes: number;
  title: string;
  description: string;
}

export interface IComment {
  id: number;
  post_id: number;
  writer_id: number;
  comment: string;
  likes: number;
  username: string;
}
