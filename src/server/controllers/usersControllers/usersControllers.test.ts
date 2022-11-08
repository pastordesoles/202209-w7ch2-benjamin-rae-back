import "../../loadEnvironment.js";
import { loginUser } from "./usersControllers";
import type { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import User from "../../../database/models/User.js";
import errors from "../../../CustomError/errors.js";

const secret = process.env.JWT_SECRET;

const token = jwt.sign({}, secret);

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

const req: Partial<Request> = {
  body: {
    username: "testname",
    password: "testpass",
  },
};

describe("Given a loginUser controller", () => {
  describe("When it receives a request with an unknown username, a response object and next function", () => {
    test("Then it should invoke the function next an error a username error", async () => {
      User.findOne = jest.fn().mockReturnValueOnce(null);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(errors.usernameError);
    });
  });
});
