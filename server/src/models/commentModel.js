import { sequelize } from "./dbConnection.js";
import { DataTypes, Model } from "sequelize";

export default class Comment extends Model {}
Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    modelName: "Comment",
    sequelize,
    timestamps: true,
    createdAt: true,
    updatedAt: false,
    deletedAt: false,
  }
);
