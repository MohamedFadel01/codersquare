import express from "express";
import logger from "morgan";
import userRouter from "./src/routers/usersRoute.js";
import postRouter from "./src/routers/postsRoute.js";
import commentRouter from "./src/routers/commentsRoute.js";
import userAuthenticate from "./src/middlewares/userAuthMiddleware.js";

const app = express();

app.use(express.json());
app.use(logger("dev"));

app.use("/api/users", userRouter);
app.use(userAuthenticate);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

export default app;
