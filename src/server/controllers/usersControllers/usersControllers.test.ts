import jwt from "jsonwebtoken";
import type { Response, NextFunction, Request } from "express";
import bcrypt from "bcryptjs";
import { loginUser } from "./usersControllers";
import User from "../../../database/models/User.js";
import errors from "../../../CustomError/errors.js";
import type { LoginBody } from "./types.js";
import environment from "../../loadEnvironment.js";

beforeEach(() => {
  jest.clearAllMocks();
});
const { jwtSecret } = environment;

const token = jwt.sign({}, jwtSecret);

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a loginUser controller", () => {
  const loginBody: LoginBody = {
    username: "testname",
    password: "testpass",
  };

  const req: Partial<Request> = {
    body: loginBody,
  };

  describe("When it receives a request with an unknown username, a response object and next function", () => {
    test("Then it should invoke the function next with a username error", async () => {
      User.findOne = jest.fn().mockResolvedValueOnce(null);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(errors.usernameError);
    });
  });

  describe("When it receives a request with an incorrect password, a response object and next function", () => {
    test("Then it should invoke the function next with an password error", async () => {
      User.findOne = jest.fn().mockResolvedValue(loginBody);

      bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(errors.passwordError);
    });
  });

  describe("When it receives a request with a correct username and password and a response object", () => {
    test("Then it should invoke response's methods status with 200 and json with a token", async () => {
      const expectedStatus = 200;
      User.findOne = jest.fn().mockResolvedValue(loginBody);
      bcrypt.compare = jest.fn().mockResolvedValueOnce(true);
      jwt.sign = jest.fn().mockReturnValueOnce(token);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });
});
