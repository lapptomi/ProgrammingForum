export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
}

export interface Post {
  id: number;
  original_poster_id: number;
  title: string;
  description: string;
  posting_date: Date;
}

export interface Token {
  id: number;
  username: string;
}

export interface Comment {
  id: number;
  post_id: number;
  writer_id: number;
  comment: string;
  posting_date: Date;
  likes?: number;
}

export type NewComment = Omit<Comment, 'id'|'posting_date'>;

export type NewPost = Omit<Post, 'id'|'posting_date'>;

export type NewUser = Omit<User, 'id'>;

export enum Table {
  User = 'user',
  Post = 'post',
  PostLikes = 'post_like',
  PostComments = 'post_comment',
  PostCommentLikes = 'post_comment_like',
}
