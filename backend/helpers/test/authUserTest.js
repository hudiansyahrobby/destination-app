const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);

export const authUserTest = (user) => {
  let token;

  request
    .post("/api/v1/signup")
    .send(user)
    .end((err, response) => {
      request
        .post("/api/v1/login")
        .send({
          email: user.email,
          password: user.password,
        })
        .end((err, response) => {
          token = response.body.results.accessToken; // save the token!
        });
    });

  return token;
};
