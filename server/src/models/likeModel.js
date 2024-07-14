import { sequelize } from "./dbConnection.js";
import { DataTypes, Model } from "sequelize";

export default class Like extends Model {}
Like.init(
  {
    //all of the model attributes are foreign keys
  },
  {
    modelName: "Like",
    sequelize,
    timestamps: false,
  }
);
