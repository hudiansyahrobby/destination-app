"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserFavorite extends Model {
    static associate(models) {}
  }
  UserFavorite.init(
    {
      userId: DataTypes.INTEGER,
      destinationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserFavorite",
      timestamps: false,
      tableName: "user_favorites",
    }
  );
  return UserFavorite;
};
