import Like from "../models/likeModel.js";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import errorMsgSender from "../utils/errorMsgSender.js";
import validator from "validator";
import log from "fancy-log";
import { ForeignKeyConstraintError, UniqueConstraintError } from "sequelize";

export const createLike = async (req, res) => {
  const { postId } = req.body;
  if (!postId) {
    return errorMsgSender(res, 400, "required fields are missing");
  }
  if (!validator.isUUID(postId)) {
    return errorMsgSender(res, 400, "invalid post id");
  }

  try {
    await Like.create({ userId: res.locals.userId, postId });
    res.sendStatus(201);
  } catch (error) {
    log.error(error);
    if (error instanceof ForeignKeyConstraintError) {
      return errorMsgSender(res, 404, "post not found");
    }
    if (error instanceof UniqueConstraintError) {
      return errorMsgSender(res, 400, "like already exists");
    }
    res.sendStatus(500);
  }
};

export const getPostLikes = async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals;
  if (!validator.isUUID(postId)) {
    return errorMsgSender(res, 400, "invalid postId");
  }

  try {
    const count = await Like.count({ where: { postId } });
    const isLiked =
      (await Like.findOne({ where: { userId, postId } })) !== null;
    res.status(200).json({ count, isLiked });
  } catch (error) {
    log.error(error);
    res.sendStatus(500);
  }
};

export const deleteLike = async (req, res) => {};
