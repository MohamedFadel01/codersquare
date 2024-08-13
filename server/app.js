import express from "express";
import logger from "morgan";
import cors from "cors";
import userRouter from "./src/routers/usersRoute.js";
import postRouter from "./src/routers/postsRoute.js";
import commentRouter from "./src/routers/commentsRoute.js";
import userAuthenticate from "./src/middlewares/userAuthMiddleware.js";
import likeRouter from "./src/routers/likesRoute.js";
import errorHandler from "./src/middlewares/errorHandlerMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use("/api/users", userRouter);
app.use(userAuthenticate);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);
app.use(errorHandler);

export default app;
