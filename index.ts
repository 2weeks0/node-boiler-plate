import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./src/models/User";
import config from "./config";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 5000;
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((e) => console.log(e));

app.get("/", (req: Request, res: Response) => res.send("hihi"));

app.post("/register", (req: Request, res: Response) => {
  const user = new User(req.body);
  user.save((e, doc) => {
    if (e) {
      return res.json({ success: false, error: e });
    }
    return res.json({ success: true });
  });
});

app.listen(port, () => console.log("server start!!"));
