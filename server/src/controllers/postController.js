import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import log from "fancy-log";
import crypto from "crypto";
import errorMsgSender from "../utils/errorMsgSender.js";
import { ValidationError } from "sequelize";

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

export const getPost = async (req, res) => {};

export const getAllPosts = async (req, res) => {};

export const deletePost = async (req, res) => {};

export const updatePost = async (req, res) => {};
