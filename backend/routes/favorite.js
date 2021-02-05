const { Router } = require("express");

const router = Router();
const favoriteValidation = require("../validations/favorite");

const { create, get } = require("../controllers/favorite");
const isValid = require("../middlewares/isValid");
const { verifyUser } = require("../middlewares/userAuth");

router.post(
  "/favorites",
  verifyUser,
  isValid(favoriteValidation.favorite, "body"),
  create
);

router.get("/favorites", verifyUser, get);

module.exports = router;
