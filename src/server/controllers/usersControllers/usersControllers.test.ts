import jwt from "jsonwebtoken";
import type { Response, NextFunction, Request } from "express";
import bcrypt from "bcryptjs";
import { loginUser, registerUser } from "./usersControllers";
import User from "../../../database/models/User.js";
import errors from "../../../CustomError/errors.js";
import type { LoginBody, RegisterBody } from "./types.js";
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

describe("Given a registerUser controller", () => {
  const registerBody: RegisterBody = {
    username: "testname",
    password: "testpass",
    email: "test@email.com",
  };

  const req: Partial<Request> = {
    body: registerBody,
  };

  describe("When it receives a request with a username, password and email in the body", () => {
    test("Then it should invoke the response method status with 201 and json with the new user's username, email and id", async () => {
      const userId = "testid";
      const expectedStatus = 201;
      User.create = jest
        .fn()
        .mockResolvedValueOnce({ ...registerBody, _id: userId });
      bcrypt.hash = jest.fn().mockResolvedValueOnce("testpass");

      await registerUser(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({
        user: {
          username: registerBody.username,
          email: registerBody.email,
          id: userId,
        },
      });
    });
  });

  describe("When it receives an already registered user in the request body", () => {
    test("Then it should call next with a create user error with message 'Can't create user' and status 500", async () => {
      User.findOne = jest.fn().mockRejectedValueOnce(new Error());

      await registerUser(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(errors.createUserError);
    });
  });
});
