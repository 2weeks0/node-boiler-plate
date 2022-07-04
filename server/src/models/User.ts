import { Schema, model, Model, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  lastname: string;
  role: number;
  image: string;
  token: string;
  tokenExp: string;
  comparePassword: (plainPassword: string, callback: Function) => void;
  generateToken: (callback: Function) => void;
}

interface IUserModel extends Model<IUserDocument> {
  findByToken: (token: string, callback: Function) => void;
}

const userSchema = new Schema<IUserDocument>({
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

const saltRounds = 10;

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
    return;
  }

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (plainPassword: string, callback: Function) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback: Function) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function (err: Error, user: IUserDocument) {
    if (err) {
      return callback(err);
    }
    callback(null, user);
  });
};

userSchema.statics.findByToken = function (token: string, callback: Function) {
  const user = this;

  jwt.verify(token, "secretToken", function (err, decoded) {
    user.findOne({ _id: decoded, token }, function (err: Error, user: IUserDocument) {
      if (err) {
        return callback(err);
      }
      callback(null, user);
    });
  });
};

const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
