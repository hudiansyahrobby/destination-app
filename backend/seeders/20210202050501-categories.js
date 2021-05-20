"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "pantai",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "bukit",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "gunung",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
