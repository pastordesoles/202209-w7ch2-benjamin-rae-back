import dotenv from "dotenv";

dotenv.config();

const {
  DEBUG: debug,
  MONGODB_URL: mongoDbUrl,
  JWT_SECRET: jwtSecret,
  PORT: port,
} = process.env;

export default { debug, mongoDbUrl, jwtSecret, port };
