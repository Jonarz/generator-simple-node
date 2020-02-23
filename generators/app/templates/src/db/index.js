import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import config from "../config/config";
import constants from "../config/constants";

const basename = path.join(__dirname, "../models");
const db = {};

let sequelize;
// Production configuration
if (config.app.environment === constants.PRODUCTION) {
  sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
      host: config.database.host,
      port: config.database.port,
      dialect: constants.DATABASES.POSTGRES,
      dialectOption: {
        ssl: true,
        native: true
      },
      logging: true
    }
  );
} else {
  // Developement configuration
  sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
      dialect: constants.DATABASES.SQLITE,
      storage: ":memory",
      dialectOption: {
        ssl: true,
        native: true
      }
    }
  );
}

fs.readdirSync(basename).forEach(file => {
  const model = sequelize.import(path.join(basename, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
