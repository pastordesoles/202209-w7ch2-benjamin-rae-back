import express from "express";
import { loginUser } from "../controllers/usersControllers/usersControllers.js";
import routes from "./routes.js";

const { loginUser: loginUserRoute } = routes;

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

usersRouter.post(loginUserRoute, loginUser);

export default usersRouter;
