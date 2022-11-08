import "./server/loadEnvironment.js";
import debugConfig from "debug";
const debug = debugConfig("robots:root");
import startServer from "./server/startServer.js";
import chalk from "chalk";
import { connectDb } from "./database/index.js";

const { PORT: port, MONGODB_URL: mongoUrl } = process.env;

await connectDb(mongoUrl);

try {
  await startServer(+port);
} catch (error: unknown) {
  debug(
    chalk.red(
      `There was an error starting the server: ${(error as Error).message}`
    )
  );
}
