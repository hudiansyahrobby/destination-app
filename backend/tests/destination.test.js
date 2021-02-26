const app = require("../server");
const supertest = require("supertest");
const { sequelize } = require("../models");
const request = supertest(app);

let token;
beforeAll((done) => {
  request
    .post("/api/v1/signup")
    .send({
      name: "robby hudiansyah",
      email: "hudiansyah@gmail.com",
      isAdmin: true,
      password: "Hudiansyah12,",
      password2: "Hudiansyah12,",
    })
    .end((err, response) => {
      request
        .post("/api/v1/login")
        .send({
          email: "hudiansyah@gmail.com",
          password: "Hudiansyah12,",
        })
        .end((err, response) => {
          token = response.body.results.accessToken; // save the token!
          done();
        });
    });
});

afterAll((done) => {
  sequelize.close();
  done();
});

describe("Destination Endpoints", () => {
  describe("Create Destinations", () => {
    it("When name is not specified, send error field is required", async () => {
      const res = await request
        .post("/api/v1/destinations")
        .send({
          city: "Mataram",
          province: "Nusa Tenggara Barat",
          image:
            "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("name is a required field");
    });

    it("When city is not specified, send error field is required", async () => {
      const res = await request
        .post("/api/v1/destinations")
        .send({
          name: "Pantai Kuta",
          province: "Nusa Tenggara Barat",
          image:
            "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("city is a required field");
    });

    it("When city contains non alphabet, send error", async () => {
      const res = await request
        .post("/api/v1/destinations")
        .send({
          name: "Pantai Kuta",
          city: "mataram23",
          province: "Nusa Tenggara Barat",
          image:
            "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe(
        "city should only contain alphapet or space"
      );
    });

    it("When province is not specified, send error field is required", async () => {
      const res = await request
        .post("/api/v1/destinations")
        .send({
          name: "Pantai Kuta",
          city: "Mataram",
          image:
            "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("province is a required field");
    });

    it("When province contains non alphabet, send error", async () => {
      const res = await request
        .post("/api/v1/destinations")
        .send({
          name: "Pantai Kuta",
          province: "Nusa Tenggara Barat23",
          city: "Mataram",
          image:
            "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe(
        "province should only contain alphapet or space"
      );
    });

    it("When description is not specified, send error field is required", async () => {
      const res = await request
        .post("/api/v1/destinations")
        .send({
          name: "Pantai Kuta",
          province: "Nusa Tenggara Barat",
          city: "Mataram",
          image:
            "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("description is a required field");
    });

    it("When decription's length less than 50 characters, send error", async () => {
      const res = await request
        .post("/api/v1/destinations")
        .send({
          name: "Pantai Kuta",
          province: "Nusa Tenggara Barat",
          city: "Mataram",
          image:
            "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
          description: "There are many",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe(
        "description shoult be at least 50 characters"
      );
    });

    it("When image is not specified, send error field is required", async () => {
      const res = await request
        .post("/api/v1/destinations")
        .send({
          name: "Pantai Nipah",
          city: "Mataram",
          province: "Nusa Tenggara Barat",
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("image is a required field");
    });

    it("Create destination when there is no error", async () => {
      const res = await request
        .post("/api/v1/destinations")
        .send({
          name: "Pantai Kuta",
          province: "Nusa Tenggara Barat",
          city: "Mataram",
          image:
            "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Destination has successsfully created");
    });
  });
});
