"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Destination, {
        through: "UserFavorites",
        timestamps: false,
        as: "favorite",
      });

      User.hasMany(models.Comment);
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
