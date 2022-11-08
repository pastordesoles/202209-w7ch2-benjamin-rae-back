import "../../loadEnvironment.js";
import debug from "debug";
import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import CustomError from "../../../CustomError/CustomError.js";
import Robot from "../../../database/models/Robot.js";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const getRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    debug("Request /robots");
    const robots = await Robot.find();

    res.status(200).json({ robots });
  } catch (error: unknown) {
    next(
      new CustomError(
        (error as Error).message,
        500,
        `there was a server error try again later`
      )
    );
  }
};

export const getRobotById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idRobot } = req.params;

  try {
    debug("Request /robots/robot");
    if (!mongoose.isValidObjectId(idRobot)) {
      throw new CustomError(`The ${idRobot} no valid`, 404, `The id no valid`);
    }

    const robot = await Robot.findById(idRobot);
    res.status(200).json({ robots: robot });
  } catch (error: unknown) {
    next(
      new CustomError(
        (error as Error).message,
        (error as CustomError).status,
        (error as CustomError).publicMessage
      )
    );
  }
};

export const deleteRobotById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    throw new CustomError(
      "Authentication token missing",
      401,
      "Token is missing"
    );
  }

  const token = authHeader.replace(/^Bearer:\s*/, "");

  if (!token) {
    throw new CustomError(
      "Authentication token missing",
      401,
      "Token is missing"
    );
  }

  const { idRobot } = req.params;

  try {
    jwt.verify(token, secret, (error) => {
      if (error) {
        throw new CustomError(
          "Unauthorized, token invalid",
          401,
          "Unauthorized, token invalid"
        );
      }
    });

    if (!mongoose.isValidObjectId(idRobot)) {
      throw new CustomError(`The ${idRobot} no valid`, 404, `The id no valid`);
    }

    const robotDelete = await Robot.findByIdAndDelete(idRobot);
    res.status(200).json({ ...robotDelete });
  } catch (error: unknown) {
    next(error);
  }
};

interface EditRobotByIdBody {
  name: string;
  image: string;
  speed: number;
  strength: number;
  createdOn: string;
  _id?: string;
}

export const editRobotById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    throw new CustomError(
      "Authentication token missing",
      401,
      "Token is missing"
    );
  }

  const token = authHeader.replace(/^Bearer:\s*/, "");

  if (!token) {
    throw new CustomError(
      "Authentication token missing",
      401,
      "Token is missing"
    );
  }

  const { idRobot } = req.params;
  const editRobot = req.body as EditRobotByIdBody;

  try {
    jwt.verify(token, secret, (error) => {
      if (error) {
        throw new CustomError(
          "Unauthorized, token invalid",
          401,
          "Unauthorized, token invalid"
        );
      }
    });

    if (!mongoose.isValidObjectId(idRobot)) {
      throw new CustomError(
        `The ${idRobot} no valid`,
        404,
        `The id no valid put`
      );
    }

    const robotEdit = await Robot.findByIdAndUpdate(idRobot, editRobot, {
      returnDocument: "after",
    });
    res.status(200).json({ robot: robotEdit });
  } catch (error: unknown) {
    next(error);
  }
};
