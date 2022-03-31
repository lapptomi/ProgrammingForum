import Comment from '../models/Comment';
import Post from '../models/Post';
import User from '../models/User';
import { NODE_ENV } from './config';

export const resetDatabase = async (): Promise<void> => {
  // Delete all rows from the tables
  if (NODE_ENV === 'test') {
    await Comment.deleteMany({});
    await User.deleteMany({});
    await Post.deleteMany({});
  }
};
