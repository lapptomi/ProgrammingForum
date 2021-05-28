import mongoose, { Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IUser, IComment } from '../../types';
import { IUserSchema } from './User';

export interface IPostSchema extends Document {
  id: string;
  original_poster: IUser;
  title: string;
  description: string;
  likeCount: number;
  likers: Array<IUserSchema>;
  comments: Array<IComment>;
}

const userSchema: Schema = new mongoose.Schema({
  original_poster: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
    unique: false,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
    unique: false,
  },
  likers: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }],
  likeCount: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

userSchema.plugin(uniqueValidator);

export default mongoose.model<IPostSchema>('Post', userSchema);
