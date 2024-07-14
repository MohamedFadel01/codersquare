import User from "./userModel.js";
import Post from "./postModel.js";
import Comment from "./commentModel.js";
import Like from "./likeModel.js";
import log from "fancy-log";

const initAssociations = () => {
  try {
    //One-to-Many relationship between User and Post
    User.hasMany(Post, {
      onDelete: "CASCADE",
    });
    Post.belongsTo(User);
    log("Relationship between User and Post has been established");
  } catch (error) {
    log.error("Error initializing association between User and Post: ", error);
  }

  try {
    //One-to-Many relationship between User and Comment
    User.hasMany(Comment, {
      onDelete: "CASCADE",
    });
    Comment.belongsTo(User);
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
      onDelete: "CASCADE",
    });
    Comment.belongsTo(Post);
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
    });
    Like.belongsTo(User);
    log("Relationship between User and Like has been established");
  } catch (error) {
    log.error("Error initializing association between User and Like: ", error);
  }

  try {
    //One-to-Many relationship between Post and Like
    Post.hasMany(Like, {
      onDelete: "CASCADE",
    });
    Like.belongsTo(Post);
    log("Relationship between  Post and Like has been established");
  } catch (error) {
    log.error("Error initializing association between Post and Like: ", error);
  }
};

export default initAssociations;
