const app = require("../server");
const supertest = require("supertest");
const { sequelize } = require("../models");
const request = supertest(app);

afterAll((done) => {
  sequelize.close();
  done();
});

describe("Auth Endpoints", () => {
  it("should create a new user", async () => {
    const res = await request.post("/api/v1/signup").send({
      name: "manusia",
      email: "manusia@gmail.com",
      password: "Manusia12,",
      password2: "Manusia12,",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User successfully registered");
  });

  it("should login as user", async () => {
    const res = await request.post("/api/v1/login").send({
      email: "manusia@gmail.com",
      password: "Manusia12,",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.results).toHaveProperty("accessToken");
  });

  it("should log user out", async () => {
    const res = await request.post("/api/v1/logout");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Succesfully Sign out");
  });
});
