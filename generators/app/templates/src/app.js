import config from "../src/config/config";
import { logger } from "../src/utils/Logger";
import morgan from "morgan";
import express from "express";
import authUtils from "./utils/AuthUtils";
/* ROUTES IMPORT */
import userRouter from "./routes/UserRoutes";
import authRoutes from "./routes/AuthRoutes";
import database from "../src/db/index";

const port = config.nodejs.port || 3009;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

/*
 * IF YOU WANT TO PROTECT A ROUTE
 * USE authUtils.validateJwtToken AS middleware
 *
 * EXAMPLE: app.use('/api/v1/users', authUtils.validateJwtToken , userRouter);
 */
app.use("/api/v1/users", userRouter);
app.use("/api/v1/authorization", authRoutes);

/*
 *  sync database to create tables if not exist
 */
database.sequelize.sync();

// when a random route is inputed
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to this node API."
  })
);

app.listen(port, () => {
  logger.info("Server is running on PORT" + config.app.port);
  logger.info("Environment: " + config.app.environment);
});

export default app;
