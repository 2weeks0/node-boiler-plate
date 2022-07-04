import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  lastname: string;
  role: number;
  image: string;
  token: string;
  tokenExp: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: Number,
});

const User = model<IUser>("User", userSchema);

export default User;