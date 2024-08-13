import { sequelize } from "./dbConnection.js";
import { DataTypes, Model } from "sequelize";

export default class Like extends Model {}
Like.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    modelName: "Like",
    sequelize,
    timestamps: false,
  }
);
