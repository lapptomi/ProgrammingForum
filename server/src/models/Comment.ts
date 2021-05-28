import mongoose, { Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface ICommentSchema extends Document {
  comment_writer: string;
  comment: string;
  likes?: number;
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
  likes: {
    type: Number,
    default: 0,
  },
});

userSchema.plugin(uniqueValidator);

export default mongoose.model<ICommentSchema>('Comment', userSchema);
