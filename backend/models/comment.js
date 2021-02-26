"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Destination, {
        foreignKey: "destinationId",
        onDelete: "CASCADE",
      });

      Comment.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        as: "user",
      });
    }
  }
  Comment.init(
    {
      rating: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      destinationId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
