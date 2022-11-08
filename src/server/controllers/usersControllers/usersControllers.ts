import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
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
      throw errors.usernameError;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw errors.passwordError;
    }

    const token = jwt.sign({ username, id: user._id }, jwtSecret, {
      expiresIn: "2d",
    });

    res.status(200).json({ token });
  } catch (error: unknown) {
    next(error);
  }
};
