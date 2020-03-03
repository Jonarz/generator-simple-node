import dotenv from "dotenv";
dotenv.config();

/**
 * App environment configurations
 */
export default {
  app: {
    port: process.env.PORT,
    environment: process.env.NODE_ENV
  },
  jwt: {
    tokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    expirationTime: process.env.TOKEN_EXPIRATION_TIME
  },
  logger: {
    levelDev: process.env.LOGGER_LEVEL_DEV,
    levelProd: process.env.LOGGER_LEVEL_PROD
  }
};
