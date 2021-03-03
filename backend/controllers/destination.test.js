const app = require("../server");
const supertest = require("supertest");
const { sequelize } = require("../models");
const fs = require("mz/fs");
const request = supertest(app);
const path = require("path");

let token;
beforeAll((done) => {
  request
    .post("/api/v1/login")
    .send({
      email: "john3@gmail.com",
      password: "1234567890",
    })
    .end((err, response) => {
      token = response.body.accessToken; // save the token!
      done();
    });
});

afterAll((done) => {
  sequelize.close();
  done();
});

describe("Destination Endpoints", () => {
  describe("Create Destinations", () => {
    it("When name is not specified, send error field is required", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .post("/api/v1/destinations")
        .attach("images", filePath)
        .field("province", "Nusa Tenggara Barat")
        .field("city", "Mataram")
        .field(
          "description",
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
        )
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("name is a required field");
    });

    it("When city is not specified, send error field is required", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .post("/api/v1/destinations")
        .attach("images", filePath)
        .field("name", "Pantai Kuta")
        .field("province", "Nusa Tenggara Barat")
        .field(
          "description",
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
        )
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("city is a required field");
    });

    it("When city contains non alphabet, send error", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .post("/api/v1/destinations")
        .attach("images", filePath)
        .field("name", "Pantai Kuta")
        .field("province", "Nusa Tenggara Barat")
        .field("city", "Mataram23")
        .field(
          "description",
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
        )
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe(
        "city should only contain alphapet or space"
      );
    });

    it("When province is not specified, send error field is required", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .post("/api/v1/destinations")
        .attach("images", filePath)
        .field("name", "Pantai Kuta")
        .field("city", "Mataram")
        .field(
          "description",
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
        )
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("province is a required field");
    });

    it("When province contains non alphabet, send error", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .post("/api/v1/destinations")
        .attach("images", filePath)
        .field("name", "Pantai Kuta")
        .field("province", "Nusa Tenggara Barat23")
        .field("city", "Mataram")
        .field(
          "description",
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
        )
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe(
        "province should only contain alphapet or space"
      );
    });

    it("When description is not specified, send error field is required", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .post("/api/v1/destinations")
        .attach("images", filePath)
        .field("name", "Pantai Kuta")
        .field("province", "Nusa Tenggara Barat")
        .field("city", "Mataram")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("description is a required field");
    });

    it("When decription's length less than 50 characters, send error", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .post("/api/v1/destinations")
        .attach("images", filePath)
        .field("name", "Pantai Kuta")
        .field("province", "Nusa Tenggara Barat")
        .field("city", "Mataram")
        .field("description", "There are")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe(
        "description shoult be at least 50 characters"
      );
    });

    it("When image is not specified, send error field is required", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .post("/api/v1/destinations")
        .field("name", "Pantai Kuta")
        .field("province", "Nusa Tenggara Barat")
        .field("city", "Mataram")
        .field(
          "description",
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
        )
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("Upload at least one image");
    });

    it("Create destination when there is no error", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .post("/api/v1/destinations")
        .attach("images", filePath)
        .field("name", "Pantai Kuta")
        .field("province", "Nusa Tenggara Barat")
        .field("city", "Mataram")
        .field(
          "description",
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
        )
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Destination has successsfully created");
      expect(res.body.destination).toHaveProperty("name", "Pantai Kuta");
      expect(res.body.destination).toHaveProperty("city", "Mataram");
      expect(res.body.destination).toHaveProperty(
        "province",
        "Nusa Tenggara Barat"
      );
      expect(res.body.destination).toHaveProperty(
        "description",
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
      );
      expect(res.body.destination).toHaveProperty("updatedAt");
      expect(res.body.destination).toHaveProperty("createdAt");
      expect(res.body.destination.images).toHaveLength(2);
    });

    it("When destination has exist, send error", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .post("/api/v1/destinations")
        .attach("images", filePath)
        .field("name", "Pantai Kuta")
        .field("province", "Nusa Tenggara Barat")
        .field("city", "Mataram")
        .field(
          "description",
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
        )
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Destination is exist");
    });
  });

  describe("Get destination list", () => {
    it("Get destinations", async () => {
      const res = await request.get("/api/v1/destinations");
      console.log(res.body.destinations);
      expect(res.statusCode).toBe(200);
      expect(res.body.destinations).toHaveProperty("currentPage", 0);
      expect(res.body.destinations).toHaveProperty("results");
      expect(res.body.destinations.results).toHaveLength(4);
      expect(res.body.destinations).toHaveProperty("totalItems", 4);
      expect(res.body.destinations).toHaveProperty("totalPages", 1);
    });

    it("Get destinations Detail", async () => {
      const res = await request.get("/api/v1/destinations/1");
      console.log(res.body);
      expect(res.statusCode).toBe(200);
      expect(res.body.destination).toHaveProperty("name", "Pantai Ampenan");
      expect(res.body.destination).toHaveProperty(
        "province",
        "Nusa Tenggara Barat"
      );
      expect(res.body.destination).toHaveProperty("city", "Mataram");
      expect(res.body.destination).toHaveProperty(
        "description",
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
      );
      expect(res.body.destination).toHaveProperty("comments");
    });
    it("If destination detail doesn't exist, send error", async () => {
      const res = await request.get("/api/v1/destinations/10");
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Destination not found");
    });
  });

  describe("Update destination", () => {
    it("When name is not specified, send error field is required", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .put("/api/v1/destinations/4")
        .attach("images", filePath)
        .field("province", "Nusa Tenggara Barat")
        .field("city", "Mataram")
        .field(
          "description",
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
        )
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("name is a required field");
    });
    it("When city is not specified, send error field is required", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .put("/api/v1/destinations/4")
        .attach("images", filePath)
        .field("name", "pantai sejahtera")
        .field("province", "Nusa Tenggara Barat")
        .field(
          "description",
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
        )
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("city is a required field");
    });
    it("When city contains non alphabet, send error", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .put("/api/v1/destinations/4")
        .attach("images", filePath)
        .field("name", "pantai sejahtera")
        .field("province", "Nusa Tenggara Barat")
        .field("city", "Mataram23")
        .field(
          "description",
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
        )
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe(
        "city should only contain alphapet or space"
      );
    });
    it("When province is not specified, send error field is required", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .put("/api/v1/destinations/4")
        .attach("images", filePath)
        .field("name", "pantai sejahtera")
        .field("city", "Mataram")
        .field(
          "description",
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
        )
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("province is a required field");
    });
    it("When province contains non alphabet, send error", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .put("/api/v1/destinations/4")
        .attach("images", filePath)
        .field("name", "pantai sejahtera")
        .field("province", "Nusa Tenggara Barat23")
        .field("city", "Mataram")
        .field(
          "description",
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
        )
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe(
        "province should only contain alphapet or space"
      );
    });
    it("When description is not specified, send error field is required", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .put("/api/v1/destinations/4")
        .attach("images", filePath)
        .field("name", "pantai sejahtera")
        .field("province", "Nusa Tenggara Barat")
        .field("city", "Mataram")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("description is a required field");
    });
    it("When decription's length less than 50 characters, send error", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .put("/api/v1/destinations/4")
        .attach("images", filePath)
        .field("name", "pantai sejahtera")
        .field("province", "Nusa Tenggara Barat")
        .field("city", "Mataram")
        .field("description", "There are")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe(
        "description shoult be at least 50 characters"
      );
    });
    it("When image is not specified, send error field is required", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .put("/api/v1/destinations/4")
        .field("name", "pantai sejahtera")
        .field("province", "Nusa Tenggara Barat")
        .field("city", "Mataram")
        .field(
          "description",
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
        )
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("Upload at least one image");
    });
    it("Update destination when there is no error", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .put("/api/v1/destinations/4")
        .attach("images", filePath)
        .field("name", "pantai sejahtera")
        .field("province", "Nusa Tenggara Timur")
        .field("city", "Flores")
        .field(
          "description",
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generatorz"
        )
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Destination successfully updated");
      expect(res.body.destination).toHaveProperty("name", "pantai sejahtera");
      expect(res.body.destination).toHaveProperty("city", "Flores");
      expect(res.body.destination).toHaveProperty(
        "province",
        "Nusa Tenggara Timur"
      );
      expect(res.body.destination).toHaveProperty(
        "description",
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generatorz"
      );
      expect(res.body.destination).toHaveProperty("updatedAt");
      expect(res.body.destination).toHaveProperty("createdAt");
      expect(res.body.destination.images).toHaveLength(2);
    });

    it("When destination doesn't exist, send error", async () => {
      const filePath = path.join(__dirname, "..", "testFiles", "test.jpeg");
      const isFileExist = await fs.exists(filePath);
      if (!isFileExist) throw new Error("file does not exist");
      const res = await request
        .put("/api/v1/destinations/9")
        .attach("images", filePath)
        .field("name", "pantai sejahtera")
        .field("province", "Nusa Tenggara Barat")
        .field("city", "Mataram")
        .field(
          "description",
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators"
        )
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
        .delete("/api/v1/destinations/4")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Destination successfully deleted");
      expect(res.body.destination).toHaveProperty("name", "pantai sejahtera");
      expect(res.body.destination).toHaveProperty("city", "Flores");
      expect(res.body.destination).toHaveProperty(
        "province",
        "Nusa Tenggara Timur"
      );
      expect(res.body.destination).toHaveProperty(
        "description",
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generatorz"
      );
      expect(res.body.destination).toHaveProperty("updatedAt");
      expect(res.body.destination).toHaveProperty("createdAt");
      expect(res.body.destination.images).toHaveLength(2);
    });
  });
});
