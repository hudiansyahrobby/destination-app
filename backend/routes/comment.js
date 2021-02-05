const { Router } = require("express");

const router = Router();

const commentValidation = require("../validations/comment");
const { create, update, remove, get } = require("../controllers/comment");
const isValid = require("../middlewares/isValid");
const { verifyUser } = require("../middlewares/userAuth");

router.post(
  "/comments",
  verifyUser,
  isValid(commentValidation.comment, "body"),
  create
);

router.get("/comments/", verifyUser, get);

router.put(
  "/comments/:id",
  verifyUser,
  isValid(commentValidation.comment, "body"),
  update
);

router.delete("/comments/:id", verifyUser, remove);

module.exports = router;
