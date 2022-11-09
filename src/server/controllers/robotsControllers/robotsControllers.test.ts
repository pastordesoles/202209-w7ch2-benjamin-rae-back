import "../../loadEnvironment.js";
import type { NextFunction, Response, Request } from "express";
import {
  deleteRobotById,
  editRobotById,
  getRobotById,
  getRobots,
} from "./robotsControllers";
import Robot from "../../../database/models/Robot.js";
import mockFindReturnValue from "../../../mocks/mockFindReturnValue.js";
import mongoose, { Error } from "mongoose";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const authenticationToken = jwt.sign({}, secret);

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a getRobots controllers", () => {
  describe("When it receives a response and find return list of robots", () => {
    test("Then it should  call its method status with 200", async () => {
      const expectedStatus = 200;

      Robot.find = jest.fn().mockReturnValueOnce(mockFindReturnValue);

      await getRobots(null, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call its method json", async () => {
      Robot.find = jest.fn().mockReturnValueOnce(mockFindReturnValue);

      await getRobots(null, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith({ robots: mockFindReturnValue });
    });
  });

  describe("When it receives a response and find rejects", () => {
    test("Then its should call its method error", async () => {
      Robot.find = jest.fn().mockRejectedValueOnce(new Error(""));

      await getRobots(null, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a getRobotById controllers", () => {
  describe("When it recieves response a findById a return one robot with id", () => {
    test("Then its should call its method status 200", async () => {
      const robotId = new mongoose.Types.ObjectId();
      const req: Partial<Request> = {
        params: {
          idRobot: robotId.toString(),
        },
      };
      const expectedStatus = 200;
      Robot.findById = jest
        .fn()
        .mockReturnValueOnce({ robot: mockFindReturnValue });

      await getRobotById(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives an incorrect id", () => {
    test("Then its should call next", async () => {
      const robotIdIncorrect = "1";
      const req: Partial<Request> = {
        params: {
          idRobot: robotIdIncorrect,
        },
      };

      await getRobotById(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe(" Given a deleteRobotById a controllers", () => {
  describe("Whend it receives a correct token one deleted robot id with findByIdAndDelete ", () => {
    test("Then its should a call its method staus 200", async () => {
      const robotId = new mongoose.Types.ObjectId();

      const status = 200;

      const robot = {
        _id: robotId.toString(),
        name: "",
        image: "",
        speed: 1,
        strength: 1,
        createdOn: 1,
      };

      const req: Partial<Request> = {
        params: {
          idRobot: robotId.toString(),
        },
      };

      req.header = jest.fn().mockReturnValue(`Bearer ${authenticationToken}`);

      Robot.findByIdAndDelete = jest.fn().mockReturnValue(robot);

      await deleteRobotById(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });

  describe("Whend it receives a request token mariomiracomotesteoo resonse one deleted robot id with findByIdAndDelete", () => {
    test("Then its should a call its next", async () => {
      const robotId = new mongoose.Types.ObjectId();

      const robot = {
        _id: robotId.toString(),
        name: "",
        image: "",
        speed: 1,
        strength: 1,
        createdOn: 1,
      };

      const req: Partial<Request> = {
        params: {
          idRobot: robotId.toString(),
        },
      };

      req.header = jest.fn().mockReturnValue(`Bearer mariomiracomotesteoo`);

      Robot.findByIdAndDelete = jest.fn().mockReturnValue(robot);

      await deleteRobotById(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives an invalid id", () => {
    test("Then is should a call next", async () => {
      const idRobotIncorrect = "uooooo";
      const req: Partial<Request> = {
        params: {
          idRobot: idRobotIncorrect,
        },
      };

      req.header = jest.fn().mockReturnValue(`Bearer ${authenticationToken}`);

      await deleteRobotById(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a editRobotById a controller", () => {
  const robotId = new mongoose.Types.ObjectId();
  const robot = {
    _id: robotId.toString(),
    name: "",
    image: "",
    speed: 1,
    strength: 1,
    createdOn: 1,
  };

  const req: Partial<Request> = {
    query: {
      token: "patatasfritas",
    },
    params: {
      idRobot: robotId.toString(),
    },
    body: robot,
  };

  describe("when it receives a verified token and correct id", () => {
    test("Then its should call method status with 200", async () => {
      const status = 200;

      req.header = jest.fn().mockReturnValue(`Bearer ${authenticationToken}`);

      Robot.findByIdAndUpdate = jest.fn().mockReturnValue(robot);

      await editRobotById(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ robot });
    });

    describe("when it receives token 'bengracias' ", () => {
      test("Then it should call next", async () => {
        req.query.token = "bengracias";
        req.header = jest.fn().mockReturnValue(`Bearer bengracias`);

        await editRobotById(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
      });
    });

    describe("When it receives an incorrect id", () => {
      test("Then it should call next", async () => {
        req.params.idRobot = "vhsgd";

        req.header = jest.fn().mockReturnValue(`Bearer ${authenticationToken}`);

        await editRobotById(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
      });
    });
  });
});
