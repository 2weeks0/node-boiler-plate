import express from "express";

const app = express();
const port = 5000;

app.get("/", (req: express.Request, res: express.Response) => res.send("hihi"));

app.listen(5000);