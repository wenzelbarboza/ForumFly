import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
// app.use(express.static("public"));

//routes imports
import { userRouter } from "./routes/user.routes";
import { globalCatch } from "./utils/globalCatch";
import { postsRouter } from "./routes/posts.routes";
import { commentsRouter } from "./routes/comments.routes";
import { replyRouter } from "./routes/reply.routes";

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "welcome to ForumFly backend",
  });
});

// routes

app.use("/api/v1", userRouter);
app.use("/api/v1", postsRouter);
app.use("/api/v1", commentsRouter);
app.use("/api/v1", replyRouter);

//global catch
app.use(globalCatch);

app.listen(5001, () => console.log("server running on port 5001"));

export default app;
