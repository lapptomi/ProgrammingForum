import mongoose, { Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IPost, SchemaName } from '../../types';
import { getCurrentDate } from '../utils';

const postSchema: Schema = new mongoose.Schema({
  original_poster: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: SchemaName.User,
  },
  created_at: {
    type: String,
    required: true,
    default: getCurrentDate(),
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
    default: [],
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: SchemaName.Comment,
    default: [],
  }],
});

postSchema.plugin(uniqueValidator);

export default mongoose.model<IPost & Document>(SchemaName.Post, postSchema);
