import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import db_config from "./config";
import global_config from "../config/config";
import constants from "../config/constants";
const basename = path.join(__dirname, "../models");
const db = {};

let sequelize;
// Production configuration
if (global_config.app.environment === constants.PRODUCTION) {
  sequelize = new Sequelize(
    db_config.production.database,
    db_config.production.username,
    db_config.production.password,
    {
      host: db_config.production.host,
      port: db_config.production.port,
      dialect: db_config.production.dialect,
      dialectOption: db_config.production.dialectOption,
      logging: true
    }
  );
} else {
  // Developement configuration
  sequelize = new Sequelize(
    db_config.development.database,
    db_config.development.username,
    db_config.development.password,
    {
      dialect: db_config.development.dialect,
      storage: db_config.development.storage,
      dialectOption: db_config.development.dialectOption
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
