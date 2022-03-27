import Comment from '../models/Comment';
import Post from '../models/Post';
import User from '../models/User';

export const resetDatabase = async (): Promise<void> => {
  // Delete all rows from the tables
  if (process.env.NODE_ENV === 'test') {
    await Comment.deleteMany({});
    await User.deleteMany({});
    await Post.deleteMany({});
  }
};
