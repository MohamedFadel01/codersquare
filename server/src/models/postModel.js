import { sequelize } from "./dbConnection.js";
import { DataTypes, Model } from "sequelize";

export default class Post extends Model {}
Post.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "Post",
    sequelize,
    timestamps: true,
    createdAt: "postedAt",
    updatedAt: true,
    deletedAt: false,
  }
);
