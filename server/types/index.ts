export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
}

export interface IPost {
  id: number;
  original_poster: string;
  title: string;
  description: string;
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
}

export type NewComment = Omit<IComment, 'id'>;

export type NewPost = Omit<IPost, 'id'>;

export type NewUser = Omit<IUser, 'id'>;
