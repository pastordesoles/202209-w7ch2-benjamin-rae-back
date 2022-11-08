import "../../loadEnvironment.js";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const loginUser = (req: Request, res: Response) => {
  const secret = process.env.JWT_SECRET;

  const token = jwt.sign({}, secret);

  res.status(200).json({ token });
};
