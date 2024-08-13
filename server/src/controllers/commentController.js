import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import errorMsgSender from "../utils/errorMsgSender.js";
import validator from "validator";
import log from "fancy-log";
import crypto from "crypto";
import { ForeignKeyConstraintError } from "sequelize";

export const createComment = async (req, res) => {
  const id = crypto.randomUUID();
  const { postId, body } = req.body;
  if (!postId || !body) {
    return errorMsgSender(res, 400, "required fields mre missing");
  }
  if (!validator.isUUID(postId)) {
    return errorMsgSender(res, 400, "invalid post id");
  }

  try {
    await Comment.create({
      id,
      userId: res.locals.userId,
      postId,
      body,
    });
    res.status(200).json(id);
  } catch (error) {
    log.error(error);
    if (error instanceof ForeignKeyConstraintError) {
      return errorMsgSender(res, 404, "post not found");
    }
    res.sendStatus(500);
  }
};

export const getPostComments = async (req, res) => {
  const { postId } = req.params;
  if (!validator.isUUID(postId)) {
    return errorMsgSender(res, 400, "invalid post id");
  }

  try {
    const comments = await Comment.findAll({
      where: { postId },
      attributes: { exclude: ["userId", "postId"] },
      include: {
        model: User,
        as: "commentAuthor",
        attributes: ["firstName", "lastName", "username"],
      },
    });
    res.status(200).json({ comments });
  } catch (error) {
    log.error(error);
    res.sendStatus(500);
  }
};

export const deleteComment = async (req, res) => {};
