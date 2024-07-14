import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbURI = process.env.DATABASE_URI;

export const sequelize = new Sequelize(dbURI, {
  dialect: "postgres",
});

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
};
