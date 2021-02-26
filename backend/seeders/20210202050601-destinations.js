"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Destinations",
      [
        {
          name: "Pantai Ampenan",
          city: "Mataram",
          province: "Nusa Tenggara Barat",
          images: [
            "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
            "https://res.cloudinary.com/dryelsf7h/image/upload/v1612360411/wuc1qp6xbic9yhbesx8m.jpg",
          ],
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pantai Bom",
          city: "Mataram",
          province: "Nusa Tenggara Barat",
          images: [
            "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
            "https://res.cloudinary.com/dryelsf7h/image/upload/v1612360411/wuc1qp6xbic9yhbesx8m.jpg",
          ],
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "Pantai Kuta",
          city: "Lombok Tengah",
          province: "Nusa Tenggara Barat",
          images: [
            "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
            "https://res.cloudinary.com/dryelsf7h/image/upload/v1612360411/wuc1qp6xbic9yhbesx8m.jpg",
          ],
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Destinations", null, {});
  },
};
