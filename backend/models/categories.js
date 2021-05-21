"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      Categories.hasMany(models.Destination, {
        foreignKey: "categoryId",
      });
    }
  }
  Categories.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Categories",
      tableName: "categories",
    }
  );
  return Categories;
};
