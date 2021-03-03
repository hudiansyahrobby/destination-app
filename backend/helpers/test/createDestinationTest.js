const app = require("../../server");
const supertest = require("supertest");
const request = supertest(app);
const path = require("path");
const fs = require("mz/fs");

exports.createDestinationTest = async (token) => {
  const filePath = path.join(__dirname, "..", "..", "testFiles", "test.jpeg");
  const isFileExist = await fs.exists(filePath);
  if (!isFileExist) throw new Error("file does not exist");
  await request
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
};
