export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
}

export interface IPost {
  id: number;
  likers: Array<IUser>;
  original_poster: string;
  title: string;
  description: string;
  comments: Array<IComment>;
  created_at: string;
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
  id: string;
  comment_writer: string;
  comment: string;
  likers: Array<IUser>;
}

export type NewComment = Pick<IComment, 'comment_writer' | 'comment'>;

export type NewPost = Pick<IPost, 'original_poster' | 'title' | 'description'>;

export type NewUser = Omit<IUser, 'id'>;

export enum SchemaName {
  User = 'User',
  Comment = 'Comment',
  Post = 'Post',
}
