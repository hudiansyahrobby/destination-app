"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    static associate(models) {
      Destination.belongsToMany(models.User, {
        foreignKey: "userId",
        through: "user_favorites",
        timestamps: false,
      });

      Destination.hasMany(models.Comment, {
        foreignKey: "destinationId",
        as: "comments",
      });
    }
  }
  Destination.init(
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      province: DataTypes.STRING,
      description: DataTypes.TEXT,
      images: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "Destination",
      tableName: "destinations",
    }
  );
  return Destination;
};
