import express from "express";
import {
  getRobots,
  getRobotById,
  deleteRobotById,
  editRobotById,
} from "../controllers/robotsControllers/robotsControllers.js";
import routes from "./routes.js";

const {
  getRobotsRoute,
  getRobotRouteById,
  deletRobotRouterById,
  editRobotRouterById,
} = routes;

// eslint-disable-next-line new-cap
const robotsRouter = express.Router();

robotsRouter.get(getRobotsRoute, getRobots);
robotsRouter.get(getRobotRouteById, getRobotById);
robotsRouter.delete(deletRobotRouterById, deleteRobotById);
robotsRouter.put(editRobotRouterById, editRobotById);

export default robotsRouter;
