import log from "fancy-log";
import errorMsgSender from "../utils/errorMsgSender.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import Like from "../models/likeModel.js";
import validator from "validator";

export const postAuth = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = res.locals;
  if (!validator.isUUID(id)) {
    return errorMsgSender(res, 400, "invalid post id");
  }

  try {
    const post = await Post.findOne({ where: { id, userId } });
    if (!post) {
      return errorMsgSender(res, 401, "user not authorized");
    }
  } catch (error) {
    log.error(error);
    res.sendStatus(500);
  }

  next();
};
