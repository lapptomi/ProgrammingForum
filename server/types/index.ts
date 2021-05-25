export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Post {
  id: number;
  original_poster_id: number;
  title: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Token {
  token: string;
  username: string;
  id: number;
}

export interface ApolloContext {
  currentUser: User;
}

export interface Comment {
  id: number;
  post_id: number;
  writer_id: number;
  comment: string;
  created_at?: Date;
  updated_at?: Date;
}

export type NewComment = Omit<Comment, 'id'>;

export type NewPost = Omit<Post, 'id'>;

export type NewUser = Omit<User, 'id'>;

// Table names on the database
export enum Table {
  User = 'user',
  Post = 'post',
  PostLikes = 'post_like',
  PostComments = 'post_comment',
  PostCommentLikes = 'post_comment_like',
}
