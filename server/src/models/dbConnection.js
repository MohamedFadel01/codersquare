import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import log from "fancy-log";

dotenv.config();

const dbURI = process.env.DATABASE_URI;

export const sequelize = new Sequelize(dbURI, {
  dialect: "postgres",
});

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    log("Connection has been established successfully");
  } catch (error) {
    log.error("Unable to connect to the database: ", error);
  }
};

export const syncDb = async () => {
  try {
    await sequelize.sync();
    log("All models were synchronized successfully");
  } catch (error) {
    log.error("Unable to synchronize models: ", error);
  }
};
