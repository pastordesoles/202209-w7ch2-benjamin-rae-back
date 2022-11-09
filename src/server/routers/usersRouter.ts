import express from "express";
import {
  loginUser,
  registerUser,
} from "../controllers/usersControllers/usersControllers.js";
import routes from "./routes.js";

const { loginUser: loginUserRoute, registerUser: registerUserRoute } = routes;

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

usersRouter.post(loginUserRoute, loginUser);
usersRouter.post(registerUserRoute, registerUser);

export default usersRouter;
