"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Destination.belongsToMany(models.User, {
        through: "UserFavorites",
        timestamps: false,
      });
    }
  }
  Destination.init(
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      province: DataTypes.STRING,
      description: DataTypes.TEXT,
      images: {
        type: DataTypes.STRING,
        get() {
          return this.getDataValue("images").split(";");
        },
        set(val) {
          this.setDataValue("images", val.join(";"));
        },
      },
    },
    {
      sequelize,
      modelName: "Destination",
    }
  );
  return Destination;
};
