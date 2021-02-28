const app = require("../../server");
const supertest = require("supertest");
const request = supertest(app);

export const createDestinationTest = async (newDestination, token) => {
  await request
    .post("/api/v1/destinations")
    .send(newDestination)
    .set("Authorization", `Bearer ${token}`);
};
