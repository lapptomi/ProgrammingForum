export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IPost {
  id: number;
  original_poster: string;
  title: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Token {
  token: string;
  username: string;
  id: string;
}

export interface ApolloContext {
  currentUser: IUser;
}

export interface IComment {
  id: number;
  comment_writer: string;
  comment: string;
  created_at?: Date;
  updated_at?: Date;
}

export type NewComment = Omit<IComment, 'id'>;

export type NewPost = Omit<IPost, 'id'>;

export type NewUser = Omit<IUser, 'id'>;

// Table names on the database
export enum Table {
  User = 'user',
  Post = 'post',
  PostLikes = 'post_like',
  PostComments = 'post_comment',
  PostCommentLikes = 'post_comment_like',
}
