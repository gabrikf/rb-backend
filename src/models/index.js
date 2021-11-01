import { Sequelize } from "sequelize";
import { readdirSync } from "fs";
import path from "path";

const sqlite3 = require("sqlite3").verbose();

const sequelize = new Sequelize("database", null, null, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectModule: sqlite3,
  dialect: "sqlite",
  storage: "./simple-backend-test.db",
});

let db = {};

readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== "index.js" &&
      file !== "includes" &&
      file !== "queries"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].options.hasOwnProperty("associate")) {
    db[modelName].options.associate(db);
  }
});

Object.keys(db).forEach((modelName) => {
  db[modelName].sync({ force: true });
});

db.sql = sequelize;

export default db;
