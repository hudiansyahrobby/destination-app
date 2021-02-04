"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
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
    }
  );
  return UserFavorite;
};
