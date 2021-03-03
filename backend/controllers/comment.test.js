const app = require("../server");
const supertest = require("supertest");
const { sequelize } = require("../models");
const { authUserTest } = require("../helpers/test/authUserTest");
const request = supertest(app);

let firstUserToken;
let secondUserToken;

beforeAll(async (done) => {
  const firstUser = {
    email: "john@gmail.com",
    password: "1234567890",
  };

  const secondUser = {
    email: "john2@gmail.com",
    password: "1234567890",
  };

  firstUserToken = await authUserTest(firstUser);
  secondUserToken = await authUserTest(secondUser);

  done();
});

afterAll((done) => {
  sequelize.close();
  done();
});

describe("Comment Endpoints", () => {
  describe("Create comment", () => {
    it("When rating is not spesified, then send error ", async () => {
      const res = await request
        .post("/api/v1/destinations/1/comments/")
        .send({
          content: "lorem ipsum",
        })
        .set("Authorization", `Bearer ${firstUserToken}`);

      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("rating is a required field");
    });

    it("When rating is less than 1, then send error ", async () => {
      const res = await request
        .post("/api/v1/destinations/1/comments/")
        .send({
          rating: 0,
          content: "lorem ipsum",
        })
        .set("Authorization", `Bearer ${firstUserToken}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("rating must be between 0 to 5");
    });

    it("When rating is more than 5, then send error ", async () => {
      const res = await request
        .post("/api/v1/destinations/1/comments/")
        .send({
          rating: 6,
          content: "lorem ipsum",
        })
        .set("Authorization", `Bearer ${firstUserToken}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("rating must be between 0 to 5");
    });

    it("When content is not specified, then send error ", async () => {
      const res = await request
        .post("/api/v1/destinations/1/comments/")
        .send({
          rating: 5,
        })
        .set("Authorization", `Bearer ${firstUserToken}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("content is a required field");
    });

    it("When content's characters more than 1500, then send error ", async () => {
      const res = await request
        .post("/api/v1/destinations/1/comments/")
        .send({
          rating: 5,
          content:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, met asidjiad",
        })
        .set("Authorization", `Bearer ${firstUserToken}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("content must less than 1500 characters");
    });

    it("When user not logged in, then send error ", async () => {
      const res = await request.post("/api/v1/destinations/1/comments/").send({
        rating: 5,
        content: "lorem ipsum",
      });
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Unauthorized, Access Denied");
    });

    it("When there is no error, create new comment", async () => {
      const res = await request
        .post("/api/v1/destinations/1/comments/")
        .send({
          rating: 5,
          content: "lorem ipsum",
        })
        .set("Authorization", `Bearer ${firstUserToken}`);
      expect(res.statusCode).toBe(201);
      expect(res.body.comment).toHaveProperty("id");
      expect(res.body.comment).toHaveProperty("rating", 5);
      expect(res.body.comment).toHaveProperty("content", "lorem ipsum");
      expect(res.body.comment).toHaveProperty("isEdited", false);
      expect(res.body.comment).toHaveProperty("destinationId", 1);
      expect(res.body.comment).toHaveProperty("userId", 1);
      expect(res.body.message).toBe("Comment added successfully");
    });

    it("When user's comment is already exist in this destination, then send error", async () => {
      const res = await request
        .post("/api/v1/destinations/1/comments/")
        .send({
          rating: 4,
          content: "lorem ipsum",
        })
        .set("Authorization", `Bearer ${firstUserToken}`);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe(
        "You have commented on this destination, please edit your commment instead"
      );
    });
  });

  describe("Update comment", () => {
    it("When rating is not spesified, then send error ", async () => {
      const res = await request
        .put("/api/v1/destinations/1/comments/1")
        .send({
          content: "lorem ipsum",
        })
        .set("Authorization", `Bearer ${firstUserToken}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("rating is a required field");
    });

    it("When rating is less than 1, then send error ", async () => {
      const res = await request
        .put("/api/v1/destinations/1/comments/1")
        .send({
          rating: 0,
          content: "lorem ipsum",
        })
        .set("Authorization", `Bearer ${firstUserToken}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("rating must be between 0 to 5");
    });

    it("When rating is more than 5, then send error ", async () => {
      const res = await request
        .put("/api/v1/destinations/1/comments/1")
        .send({
          rating: 6,
          content: "lorem ipsum",
        })
        .set("Authorization", `Bearer ${firstUserToken}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("rating must be between 0 to 5");
    });

    it("When content is not specified, then send error ", async () => {
      const res = await request
        .put("/api/v1/destinations/1/comments/1")
        .send({
          rating: 5,
        })
        .set("Authorization", `Bearer ${firstUserToken}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("content is a required field");
    });

    it("When content's characters more than 1500, then send error ", async () => {
      const res = await request
        .put("/api/v1/destinations/1/comments/1")
        .send({
          rating: 5,
          content:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, met asidjiad",
        })
        .set("Authorization", `Bearer ${firstUserToken}`);
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("content must less than 1500 characters");
    });

    it("When user not logged in, then send error ", async () => {
      const res = await request.put("/api/v1/destinations/1/comments/1").send({
        rating: 5,
        content: "lorem ipsum",
      });
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Unauthorized, Access Denied");
    });

    it("When user try to update other's comment, then send error", async () => {
      const res = await request
        .put("/api/v1/destinations/1/comments/1")
        .send({
          rating: 5,
          content: "lorem ipsum",
        })
        .set("Authorization", `Bearer ${secondUserToken}`);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("This comment doesn't belong to this user");
    });

    it("When there is no error, update comment", async () => {
      const res = await request
        .put("/api/v1/destinations/1/comments/1")
        .send({
          rating: 3,
          content: "lorem ipsum dolor",
        })
        .set("Authorization", `Bearer ${firstUserToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.comment).toHaveProperty("rating", 3);
      expect(res.body.comment).toHaveProperty("content", "lorem ipsum dolor");
      expect(res.body.comment).toHaveProperty("isEdited", true);
      expect(res.body.comment).toHaveProperty("destinationId", 1);
      expect(res.body.comment).toHaveProperty("userId", 1);
      expect(res.body.message).toBe("Comment updated successfully");
    });
  });

  describe("delete comment", () => {
    it("When comment doesn't exist, then send error ", async () => {
      const res = await request
        .delete("/api/v1/destinations/comments/10")
        .set("Authorization", `Bearer ${firstUserToken}`);

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Comment not found");
    });

    it("When user not logged in, then send error ", async () => {
      const res = await request.delete("/api/v1/destinations/comments/1");
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Unauthorized, Access Denied");
    });

    it("When user try to delete other's comment, then send error", async () => {
      const res = await request
        .delete("/api/v1/destinations/comments/1")
        .set("Authorization", `Bearer ${secondUserToken}`);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Can't delete comment that is not yours");
    });

    it("When there is no error, delete comment", async () => {
      const res = await request
        .delete("/api/v1/destinations/comments/1")
        .set("Authorization", `Bearer ${firstUserToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Comment deleted successfully");
      expect(res.body.comment).toHaveProperty("id", 1);
      expect(res.body.comment).toHaveProperty("rating");
      expect(res.body.comment).toHaveProperty("content");
      expect(res.body.comment).toHaveProperty("destinationId");
      expect(res.body.comment).toHaveProperty("userId");
      expect(res.body.comment).toHaveProperty("isEdited");
    });
  });
});
