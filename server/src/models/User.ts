import mongoose, { Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUserSchema extends Document {
  email: string;
  username: string;
  password: string;
}

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

export default mongoose.model<IUserSchema>('User', userSchema);
