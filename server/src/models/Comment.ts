import mongoose, { Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IComment, SchemaName } from '../../types';
import { getCurrentDate } from '../utils';

const commentSchema: Schema = new mongoose.Schema({
  comment_writer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: SchemaName.User,
  },
  created_at: {
    type: String,
    required: true,
    default: getCurrentDate(),
  },
  comment: {
    type: String,
    required: true,
    unique: false,
    minlength: 2,
  },
  likers: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: SchemaName.User,
    default: [],
  }],
});

commentSchema.plugin(uniqueValidator);

export default mongoose.model<IComment & Document>(SchemaName.Comment, commentSchema);
