const app = require("../server");
const supertest = require("supertest");
const { sequelize } = require("../models");
const { authUserTest } = require("../helpers/test/authUserTest");
<<<<<<< HEAD

=======
const {
  createDestinationTest,
} = require("../helpers/test/createDestinationTest");
>>>>>>> parent of deb3fe6... fix all testing on backend
const request = supertest(app);

let token;
beforeAll((done) => {
  const user = {
    name: "robby hudiansyah",
    email: "hudiansyah@gmail.com",
    password: "Hudiansyah12,",
    password2: "Hudiansyah12,",
  };

  token = authUserTest(user);

<<<<<<< HEAD
  done();
=======
  const newDestination = {
    name: "Pantai Kuta",
    province: "Nusa Tenggara Barat",
    city: "Mataram",
    images:
      "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators",
  };

  createDestinationTest(newDestination, adminToken);
>>>>>>> parent of deb3fe6... fix all testing on backend
});

afterAll((done) => {
  sequelize.close();
  done();
});

describe("Favorite Endpoints", () => {
  describe("Toggle Favorite Destination", () => {
    it("When destination has not been favorited, favorite it ", async () => {
      const res = await request
        .post("/api/v1/favorites/1")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(201);
      expect(res.body.item).toHaveProperty("userId", 1);
      expect(res.body.item).toHaveProperty("destinationId", 1);
      expect(res.body.message).toBe("Successfully added to favorite item");
    });

    it("When destination has been favorited, remove it ", async () => {
      const res = await request
        .post("/api/v1/favorites/1")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.item).toHaveProperty("userId", 1);
      expect(res.body.item).toHaveProperty("destinationId", 1);
      expect(res.body.message).toBe("Successfully deleted from favorite item");
    });
  });

  describe("Get Favorite Destination", () => {
    it("Get Favorite Destinations", async () => {
      await request
        .post("/api/v1/favorites/1")
        .set("Authorization", `Bearer ${token}`);

      const res = await request
        .get("/api/v1/favorites")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("favoritedItems");
    });
  });
});
