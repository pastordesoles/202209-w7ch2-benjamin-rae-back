import chalk from "chalk";
import debugConfig from "debug";
import type { NextFunction, Request, Response } from "express";
import type CustomError from "../../CustomError/CustomError";

const debug = debugConfig("robots:errors");

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  debug(chalk.red(`There was an error: ${error.message}`));
  const statusCode = error.status ?? 500;
  const publicMessage =
    error.publicMessage || "Something went wrong on the server";

  res.status(statusCode).json({ message: publicMessage });
};

export const unknownEndpoint = (req: Request, res: Response) => {
  debug(chalk.red("Tried to access an unknown endpoint"));
  res.status(404).json({ message: "Unknown endpoint" });
};
