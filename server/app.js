import express from "express";
import logger from "morgan";
import log from "fancy-log";
import userRouter from "./src/routers/usersRoute.js";

const app = express();

app.use(express.json());
app.use(logger("dev"));

app.use("/api/users", userRouter);

export default app;
