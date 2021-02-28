const app = require("../server");
const supertest = require("supertest");
const { sequelize } = require("../models");
const { describe } = require("pm2");
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
          images:
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
          images:
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
          images:
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
          images:
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
          images:
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
          images:
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
          images:
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
          images:
            "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Destination has successsfully created");
    });

    it("When destination has exist, send error", async () => {
      const res = await request
        .post("/api/v1/destinations")
        .send({
          name: "Pantai Kuta",
          province: "Nusa Tenggara Barat",
          city: "Mataram",
          images:
            "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Destination is exist");
    });
  });

  describe("Get destination list", () => {
    it("Get destinations", async () => {
      const res = await request.get("/api/v1/destinations");
      expect(res.statusCode).toBe(200);
      expect(res.body.destinations).toHaveLength(1);
    });

    it("Get destinations Detail", async () => {
      const res = await request.get("/api/v1/destinations/1");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name", "Pantai Kuta");
      expect(res.body).toHaveProperty("province", "Nusa Tenggara Barat");
      expect(res.body).toHaveProperty("city", "Mataram");
      expect(res.body).toHaveProperty(
        "description",
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
      );
      expect(res.body).toHaveProperty("comment");
    });

    it("If destination detail doesn't exist, send error", async () => {
      const res = await request.get("/api/v1/destinations/2");
      expect(res.statusCode).toBe(400);
      expect(res.body, message).toBe("Destination not found");
    });
  });

  describe("Update destination", () => {
    it("When name is not specified, send error field is required", async () => {
      const res = await request
        .put("/api/v1/destinations")
        .send({
          city: "Mataram",
          province: "Nusa Tenggara Barat",
          images:
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
        .put("/api/v1/destinations")
        .send({
          name: "Pantai Kuta",
          province: "Nusa Tenggara Barat",
          images:
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
        .put("/api/v1/destinations")
        .send({
          name: "Pantai Kuta",
          city: "mataram23",
          province: "Nusa Tenggara Barat",
          images:
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
        .put("/api/v1/destinations/1")
        .send({
          name: "Pantai Kuta",
          city: "Mataram",
          images:
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
        .put("/api/v1/destinations/1")
        .send({
          name: "Pantai Kuta",
          province: "Nusa Tenggara Barat23",
          city: "Mataram",
          images:
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
        .put("/api/v1/destinations/1")
        .send({
          name: "Pantai Kuta",
          province: "Nusa Tenggara Barat",
          city: "Mataram",
          images:
            "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("description is a required field");
    });

    it("When decription's length less than 50 characters, send error", async () => {
      const res = await request
        .put("/api/v1/destinations/1")
        .send({
          name: "Pantai Kuta",
          province: "Nusa Tenggara Barat",
          city: "Mataram",
          images:
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
        .put("/api/v1/destinations/1")
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

    it("Update destination when there is no error", async () => {
      const res = await request
        .put("/api/v1/destinations")
        .send({
          name: "Pantai Malimbu",
          province: "Nusa Tenggara Barat",
          city: "Mataram",
          images:
            "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.destination.name).toBe("Pantai Malimbu");
      expect(res.body.message).toBe("Destination successfully updated");
    });

    it("When destination doesn't exist, send error", async () => {
      const res = await request
        .put("/api/v1/destinations/7")
        .send({
          name: "Pantai Kuta",
          province: "Nusa Tenggara Barat",
          city: "Mataram",
          images:
            "http://www.lombokindonesia.org/wp-content/uploads/2012/03/kuta-beach-lombok.jpg",
          description:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Destination not found");
    });
  });

  describe("Delete destination", () => {
    it("When destination doesn't exist, send error", async () => {
      const res = await request
        .delete("/api/v1/destinations/10")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Error deleting, destination not found");
    });

    it("When destination exist, delete it", async () => {
      const res = await request
        .delete("/api/v1/destinations/1")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Destination successfully deleted");
    });
  });
});
