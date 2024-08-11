import express from "express";
import {
  signup,
  login,
  logout,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import userAuthenticate from "../middlewares/userAuthMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);

userRouter.use(userAuthenticate);

userRouter.get("/logout", logout);
userRouter.put("/", updateUser);
userRouter.delete("/", deleteUser);
export default userRouter;
