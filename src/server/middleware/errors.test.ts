import type { Response } from "express";
import CustomError from "../../CustomError/CustomError";
import { generalError, unknownEndpoint } from "./errors";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given the middleware generalError", () => {
  describe("When it is invoked and it receives", () => {
    const status = 409;
    const message = "General pete";
    const publicMessage = "Something has petated";
    const newError = new CustomError(message, status, publicMessage);

    describe("an error with status 409", () => {
      test("Then the status method of the response should be invoked with 409", () => {
        generalError(newError, null, res as Response, null);

        expect(res.status).toHaveBeenCalledWith(status);
      });
    });

    describe("an error with public message 'Something has petated'", () => {
      test("Then the json method of the response should be invoked with message 'Something has petated'", () => {
        const expectedResponseBody = {
          message: newError.publicMessage,
        };

        generalError(newError, null, res as Response, null);

        expect(res.json).toHaveBeenCalledWith(expectedResponseBody);
      });
    });
    const basicError = new Error(message);

    describe("an error with no status", () => {
      test("Then it should invoke status method of response with 500", () => {
        const expectedStatus = 500;

        generalError(basicError as CustomError, null, res as Response, null);

        expect(res.status).toHaveBeenCalledWith(expectedStatus);
      });
    });

    describe("an error with no public message", () => {
      test("Then it should invoke the json method of response with the message 'Something went wrong on the server'", () => {
        const expectedMessage = "Something went wrong on the server";

        generalError(basicError as CustomError, null, res as Response, null);

        expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
      });
    });
  });
});

describe("Given the middleware unknownEndpoint", () => {
  describe("When it is invoked with a response", () => {
    test("Then it should invoke the status method of the response with 404", () => {
      const expectedStatus = 404;

      unknownEndpoint(null, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("And it should invoke the json method of the response with the message 'Unknown endpoint'", () => {
      const expectedResponse = {
        message: "Unknown endpoint",
      };

      unknownEndpoint(null, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
