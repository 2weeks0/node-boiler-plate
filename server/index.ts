import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User, { IUserDocument } from "./src/models/User";
import config from "./src/config";
import cookieParser from "cookie-parser";
import auth from "./src/middleware/auth";
import cors from "cors";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

const port = 5000;
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.post("/register", (req: Request, res: Response) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.json({ success: true });
  });
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        success: false,
        msg: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    user.comparePassword(req.body.password, (err: Error, isMatch: boolean) => {
      if (err) {
        return res.status(400).send(err);
      }

      if (!isMatch) {
        return res.json({
          success: false,
          msg: "비밀번호가 틀렸습니다.",
        });
      }

      user.generateToken((err: Error, user: IUserDocument) => {
        if (err) {
          return res.status(400).send(err);
        }
        res.cookie("x_auth", user.token).json({ success: true, userId: user._id });
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.get("/auth", auth, (req: Request, res: Response) => {
  res.json(req.user);
});

app.get("/logout", auth, (req: Request, res: Response) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err: Error) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.json({ success: true });
  });
});

app.listen(port, () => console.log("server start!!"));
