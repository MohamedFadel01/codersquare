import bcrypt from "bcrypt";
import crypto from "crypto";
import log from "fancy-log";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../models/userModel.js";
import errorMsgSender from "../utils/errorMsgSender.js";
import { UniqueConstraintError } from "sequelize";

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
      const [alreadyExistingField] = error.fields;
      errorMsgSender(res, 409, `${alreadyExistingField} already exists`);
    } else {
      errorMsgSender(res, 500, "Internal Server Error");
    }
  }
};

// const login = (req, res) => {};

// const logout = (req, res) => {};
