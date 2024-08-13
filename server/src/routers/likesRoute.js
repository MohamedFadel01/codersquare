import express from "express";
import {
  createLike,
  getPostLikes,
  deleteLike,
} from "../controllers/likeController.js";
import { likeAuth } from "../middlewares/authorizationMiddleware.js";

const likeRouter = express.Router();

likeRouter.post("/", createLike);
likeRouter.get("/:postId", getPostLikes);
likeRouter.delete("/:id", likeAuth, deleteLike);

export default likeRouter;
