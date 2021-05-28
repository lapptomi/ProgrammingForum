import mongoose, { Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IUser } from '../../types';

export interface ICommentSchema extends Document {
  comment_writer: string;
  comment: string;
  likeCount: number;
  likers: Array<IUser>;
}

const userSchema: Schema = new mongoose.Schema({
  comment_writer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  comment: {
    type: String,
    required: true,
    unique: false,
    minlength: 2,
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
});

userSchema.plugin(uniqueValidator);

export default mongoose.model<ICommentSchema>('Comment', userSchema);
