import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import configJson from "../config/config";

const basename = path.join(__dirname, "../models");

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

const config = configJson[env];

console.log("this is the environment: ", env);

const db = {};

let sequelize;
if (config.environment === "production") {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
      dialectOption: {
        ssl: true,
        native: true
      },
      logging: true
    }
  );
} else {
   sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      dialect: "sqlite",
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
