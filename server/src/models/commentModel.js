import {sequelize} from "./dbConnection.js";
import { DataTypes, Model } from "sequelize";

export default class Comment extends Model {}
Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    // userId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
    // postId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
    body: {
      type: DataTypes.STRING,
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
