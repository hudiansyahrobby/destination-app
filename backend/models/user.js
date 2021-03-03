"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Destination, {
        foreignKey: "destinationId",
        through: "user_favorites",
        timestamps: false,
        as: "favorite",
      });

      User.hasMany(models.Comment, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
      resetPasswordToken: DataTypes.STRING,
      resetTokenExpired: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );

  User.beforeCreate((user, options) => {
    const PASSWORD_SALT = 10;
    return bcrypt
      .hash(user.password, PASSWORD_SALT)
      .then((hash) => {
        user.password = hash;
      })
      .catch((err) => {
        throw new Error();
      });
  });

  return User;
};
