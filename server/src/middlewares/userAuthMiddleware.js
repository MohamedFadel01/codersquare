import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import log from "fancy-log";
import errorMsgSender from "../utils/errorMsgSender.js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const userAuthenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return errorMsgSender(res, 401, "user not authorized");

  const token = authorization.split(" ")[1];
  if (token === null) return errorMsgSender(res, 401, "user not authorized");

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);

    if (!user || !user.loggedIn)
      return errorMsgSender(res, 401, "user not authorized");

    res.locals.userId = id;
    next();
  } catch (error) {
    log.error(error);
    if (error instanceof jwt.TokenExpiredError) {
      return errorMsgSender(res, 401, "token expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      return errorMsgSender(res, 401, "user not authorized");
    } else return errorMsgSender(res, 500, "internal server error");
  }
};

export default userAuthenticate;
