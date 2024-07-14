import sequelize from "./dbConnection";
import { DataTypes, Model } from "sequelize";

export default class Post extends Model {}
Post.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
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
    sequelize,
    timestamps: true,
    createdAt: "postedAt",
    updatedAt: false,
    deletedAt: false,
  }
);
