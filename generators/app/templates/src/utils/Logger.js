import winston from "winston";
import config from "../config/config";
import constants from "../config/constants";
export const logger = configureWinstonLogger();

function configureWinstonLogger() {
  let loggerOptions = null;
  if (config.app.environment === constants.PRODUCTION) {
    // production log configuration
    loggerOptions = {
      transports: [
        new winston.transports.Console({ level: config.logger.levelProd })
      ],
      format: winston.format.combine(
        winston.format.timestamp({
          format: "DD-MM-YYYY HH:mm:ss"
        }),
        winston.format.json()
      )
    };
  } else {
    // developement log configuration
    loggerOptions = {
      transports: [
        new winston.transports.Console({ level: config.logger.levelDev })
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    };
  }
  return winston.createLogger(loggerOptions);
}
