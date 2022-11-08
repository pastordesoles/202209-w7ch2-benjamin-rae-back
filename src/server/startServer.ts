import app from "./app.js";
import debugConfig from "debug";

const debug = debugConfig("robots:server");

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(`Server is running on http://localhost:${port}`);
      resolve(server);
    });

    server.on("error", (error) => {
      debug(`There was an error with the server: ${error.message}`);
      reject(error);
    });
  });

export default startServer;
