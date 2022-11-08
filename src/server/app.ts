import express from "express";
import morgan from "morgan";
import { generalError, unknownEndpoint } from "./middleware/errors.js";
import robotsRouter from "./routers/robotsRouter.js";
import cors from "cors";
import routes from "./routers/routes.js";
import usersRouter from "./routers/usersRouter.js";

const { robots: robotsPath, users: usersPath } = routes;

const app = express();

app.use(cors());
app.disable("x-powered-by");
app.use(express.json());
app.use(morgan("dev"));

app.use(robotsPath, robotsRouter);

app.use(usersPath, usersRouter);

app.use("/*", unknownEndpoint);
app.use(generalError);

export default app;
