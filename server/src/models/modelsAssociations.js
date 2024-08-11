import User from "./userModel.js";
import Post from "./postModel.js";
import Comment from "./commentModel.js";
import Like from "./likeModel.js";
import log from "fancy-log";

const initAssociations = () => {
  try {
    //One-to-Many relationship between User and Post
    User.hasMany(Post, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    Post.belongsTo(User, {
      as: "postAuthor",
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    log("Relationship between User and Post has been established");
  } catch (error) {
    log.error("Error initializing association between User and Post: ", error);
  }

  try {
    //One-to-Many relationship between User and Comment
    User.hasMany(Comment, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    Comment.belongsTo(User, {
      as: "commentAuthor",
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    log("Relationship between User and Comment has been established");
  } catch (error) {
    log.error(
      "Error initializing association between User and Comment: ",
      error
    );
  }

  try {
    //One-to-Many relationship between Post and Comment
    Post.hasMany(Comment, {
      foreignKey: "postId",
      onDelete: "CASCADE",
    });
    Comment.belongsTo(Post, {
      foreignKey: "postId",
      onDelete: "CASCADE",
    });
    log("Relationship between Post and Comment has been established");
  } catch (error) {
    log.error(
      "Error initializing association between Post and Comment: ",
      error
    );
  }

  try {
    //One-to-Many relationship between User and Like
    User.hasMany(Like, {
      onDelete: "CASCADE",
      foreignKey: "userId",
    });
    Like.belongsTo(User, {
      as: "user",
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    log("Relationship between User and Like has been established");
  } catch (error) {
    log.error("Error initializing association between User and Like: ", error);
  }

  try {
    //One-to-Many relationship between Post and Like
    Post.hasMany(Like, {
      foreignKey: "postId",
      onDelete: "CASCADE",
    });
    Like.belongsTo(Post, {
      foreignKey: "postId",
      onDelete: "CASCADE",
    });
    log("Relationship between  Post and Like has been established");
  } catch (error) {
    log.error("Error initializing association between Post and Like: ", error);
  }
};

export default initAssociations;
