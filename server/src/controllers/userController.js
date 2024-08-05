import bcrypt from "bcrypt";
import crypto from "crypto";
import log from "fancy-log";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../models/userModel.js";
import errorMsgSender from "../utils/errorMsgSender.js";
import { UniqueConstraintError, Op } from "sequelize";
import genJwt from "../utils/genJwt.js";

export const signup = async (req, res) => {
  const id = crypto.randomUUID();
  const { firstName, lastName, username, email, password } = req.body;

  if (!firstName || !lastName || !username || !email || !password) {
    return errorMsgSender(res, 400, "required fields are missing");
  }

  if (!validator.isEmail(email)) {
    return errorMsgSender(res, 400, "invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    return errorMsgSender(res, 400, "weak password");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    await User.create({
      id,
      username,
      firstName,
      lastName,
      email,
      password: hash,
    });
    res.sendStatus(201);
  } catch (error) {
    log.error(error);
    if (error instanceof UniqueConstraintError) {
      const { errors } = error;
      log(errors);
      const alreadyExistingField = errors[0].path;
      log(alreadyExistingField);
      errorMsgSender(res, 409, `${alreadyExistingField} already exists`);
    } else {
      errorMsgSender(res, 500, "Internal Server Error");
    }
  }
};

export const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  if (!usernameOrEmail || !password) {
    return errorMsgSender(res, 400, "required fields are missing");
  }

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });

    if (!user) {
      return errorMsgSender(res, 404, "invalid email/username or password");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return errorMsgSender(res, 401, "invalid email/username or password");
    }

    user.loggedIn = true;
    await user.save();

    res.status(200).json({
      token: genJwt(user.id),
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    log.error(error);
    res.sendStatus(500);
  }
};

// const logout = (req, res) => {};
