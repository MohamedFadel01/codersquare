import express from "express";
import {
  createComment,
  getPostComments,
  deleteComment,
} from "../controllers/commentController.js";
import { commentAuth } from "../middlewares/authorizationMiddleware.js";

const commentRouter = express.Router();

commentRouter.post("/", createComment);
commentRouter.get("/:postId", getPostComments);
commentRouter.delete("/:id", commentAuth, deleteComment);

export default commentRouter;
