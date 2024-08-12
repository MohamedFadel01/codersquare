import express from "express";
import {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
} from "../controllers/postController.js";
import { postAuth } from "../middlewares/authorizationMiddleware.js";
import userAuthenticate from "../middlewares/userAuthMiddleware.js";

const postRouter = express.Router();

postRouter.use(userAuthenticate);
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPost);
postRouter.post("/", createPost);
postRouter.use("/:id", postAuth);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);

export default postRouter;
