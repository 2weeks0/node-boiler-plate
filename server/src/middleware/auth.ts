import { NextFunction, Request, Response } from "express";
import User, { IUserDocument } from "../models/User";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.x_auth;

  User.findByToken(token, (err: Error, user: IUserDocument) => {
    if (err) {
      throw err;
    }
    if (!user) {
      return res.json({ success: false });
    }

    req.token = token;
    req.user = user;
    next();
  });
};

export default auth;
