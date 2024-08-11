import express from "express";
import logger from "morgan";
import userRouter from "./src/routers/usersRoute.js";
import postRouter from "./src/routers/postsRoute.js";

const app = express();

app.use(express.json());
app.use(logger("dev"));

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

export default app;
