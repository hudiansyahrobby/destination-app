const app = require("../server");
const supertest = require("supertest");
const { sequelize } = require("../models");
const { authUserTest } = require("../helpers/test/authUserTest");

const request = supertest(app);

let token;
beforeAll(async (done) => {
  const user = {
    email: "john@gmail.com",
    password: "1234567890",
  };

  token = await authUserTest(user);

  done();
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
      expect(res.body.item).toHaveProperty("id");
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
      expect(res.body.user.favorite).toHaveLength(1);
      expect(res.body.user.favorite[0]).toHaveProperty("id");
      expect(res.body.user.favorite[0]).toHaveProperty("name");
      expect(res.body.user.favorite[0]).toHaveProperty("city");
      expect(res.body.user.favorite[0]).toHaveProperty("province");
      expect(res.body.user.favorite[0]).toHaveProperty("description");
      expect(res.body.user.favorite[0]).toHaveProperty("images");
    });
  });
});
