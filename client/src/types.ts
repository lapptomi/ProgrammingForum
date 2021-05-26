export interface IPost {
  id: number;
  original_poster_id: number;
  original_poster_username: string;
  likes: number;
  title: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IComment {
  id: number;
  post_id: number;
  writer_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  likes: number;
  username: string;
}
