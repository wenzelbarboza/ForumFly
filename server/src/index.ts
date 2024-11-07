import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
const app = express();

const allowedOrigin = process.env.ALLOWED_ORIGIN || "";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigin, // Specify your client origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies and credentials
  })
);
app.use(helmet());
app.use(morgan("common"));
// app.use(express.static("public"));

//routes imports
import { userRouter } from "./routes/user.routes";
import { globalCatch } from "./utils/globalCatch";
import { postsRouter } from "./routes/posts.routes";
import { commentsRouter } from "./routes/comments.routes";
import { replyRouter } from "./routes/reply.routes";
import { adminRouter } from "./routes/admin.routes";

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
app.use("/api/v1", adminRouter);

//global catch
app.use(globalCatch);

app.listen(5001, () => console.log("server running on port 5001"));

export default app;
