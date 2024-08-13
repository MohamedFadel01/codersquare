import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import log from "fancy-log";
import crypto from "crypto";
import errorMsgSender from "../utils/errorMsgSender.js";
import { ValidationError, where } from "sequelize";
import validator from "validator";

export const createPost = async (req, res) => {
  const id = crypto.randomUUID();
  const { title, body } = req.body;

  if (!title || !body) {
    return errorMsgSender(res, 400, "required fields are missing");
  }

  try {
    await Post.create({
      id,
      userId: res.locals.userId,
      title,
      body,
    });
    res.status(200).json({ id });
  } catch (error) {
    log.error(error);
    if (error instanceof ValidationError) {
      return errorMsgSender(
        res,
        401,
        "unauthorized to create posts while not logged in"
      );
    }
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  if (!validator.isUUID(id)) {
    return errorMsgSender(res, 400, "invalid post id");
  }

  try {
    const post = await Post.findByPk(id, {
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        as: "postAuthor",
        attributes: ["firstName", "lastName", "username"],
      },
    });
    if (!post) {
      return errorMsgSender(res, 404, "post not found");
    }

    res.status(200).json(post);
  } catch (error) {
    log.error(error);
    res.sendStatus(500);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: {
        exclude: ["userId"],
      },
      include: {
        model: User,
        as: "postAuthor",
        attributes: ["firstName", "lastName", "username"],
      },
    });
    if (!posts || posts.length === 0) {
      return errorMsgSender(res, 404, "no posts found");
    }
    res.status(200).json(posts);
  } catch (error) {
    log.error(error);
    res.sendStatus(500);
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  if (!validator.isUUID(id)) {
    return errorMsgSender(res, 400, "invalid post id");
  }

  const { body } = req;
  if (Object.keys(body).length === 0) {
    return errorMsgSender(res, 400, "required fields are missing");
  }

  try {
    await Post.update(body, {
      where: {
        id: id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    log.error(error);
    res.sendStatus(500);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!validator.isUUID(id)) {
    return errorMsgSender(res, 400, "invalid post id");
  }

  try {
    const post = await Post.destroy({
      where: { id },
    });
    res.sendStatus(204);
  } catch (error) {
    log.error(error);
    res.sendStatus(500);
  }
};
