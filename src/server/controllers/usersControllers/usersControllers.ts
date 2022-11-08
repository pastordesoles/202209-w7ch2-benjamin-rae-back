import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../../CustomError/CustomError.js";
import errors from "../../../CustomError/errors.js";
import User from "../../../database/models/User.js";
import environment from "../../loadEnvironment.js";
import type { LoginBody } from "./types.js";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as LoginBody;
  const { jwtSecret } = environment;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      next(errors.usernameError);
      return;
    }

    const token = jwt.sign({}, jwtSecret);

    res.status(200).json({ token });
  } catch {}
};
