"use strict";

const bcrypt = require("bcryptjs");

const hashPassword = (password) =>
  bcrypt.hash(password, 10).then((hash) => {
    return hash;
  });

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John Doe",
          email: "john@gmail.com",
          password: await hashPassword("1234567890"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "John Doe2",
          email: "john2@gmail.com",
          password: await hashPassword("1234567890"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "John Doe",
          email: "john3@gmail.com",
          isAdmin: 1,
          password: await hashPassword("1234567890"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
