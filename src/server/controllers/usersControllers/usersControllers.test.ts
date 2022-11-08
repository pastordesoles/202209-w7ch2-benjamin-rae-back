import "../../loadEnvironment.js";
import { loginUser } from "./usersControllers";
import type { Response } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const token = jwt.sign({}, secret);

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a loginUser controller", () => {
  describe("When it receives a response object", () => {
    test("Then it should invoke the method status with 200 and json with a token", () => {
      const expectedStatus = 200;

      loginUser(null, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });
});
