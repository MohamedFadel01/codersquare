import express from "express";
import { signup, login, logout } from "../controllers/userController.js";
import userAuthentication from "../middlewares/userAuthMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/logout", userAuthentication, logout);

export default userRouter;
