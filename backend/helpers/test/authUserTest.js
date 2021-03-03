const app = require("../../server");
const supertest = require("supertest");
const request = supertest(app);

exports.authUserTest = async (user) => {
  const response = await request.post("/api/v1/login").send({
    email: user.email,
    password: user.password,
  });
  return response.body.accessToken;
};
