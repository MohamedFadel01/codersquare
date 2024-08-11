import { sequelize } from "./dbConnection.js";
import { DataTypes, Model } from "sequelize";

export default class Like extends Model {}
Like.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    modelName: "Like",
    sequelize,
    timestamps: false,
  }
);
