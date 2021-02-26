"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Destinations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
      },
      city: {
        type: Sequelize.STRING(70),
      },
      province: {
        type: Sequelize.STRING(50),
      },
      description: {
        type: Sequelize.TEXT,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Destinations");
  },
};
