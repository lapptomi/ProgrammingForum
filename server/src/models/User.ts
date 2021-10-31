import mongoose, { Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IUser, SchemaName } from '../../types';

const userSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
});

userSchema.plugin(uniqueValidator);

export default mongoose.model<IUser & Document>(SchemaName.User, userSchema);
