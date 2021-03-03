const { Router } = require("express");

const router = Router();

const commentValidation = require("../validations/comment");
const { create, update, remove } = require("../controllers/comment");
const isValid = require("../middlewares/isValid");
const { verifyUser } = require("../middlewares/userAuth");

router.post(
  "/destinations/:destinationId/comments/",
  verifyUser,
  isValid(commentValidation.comment, "body"),
  create
);

router.put(
  "/destinations/:destinationId/comments/:commentId",
  verifyUser,
  isValid(commentValidation.comment, "body"),
  update
);

router.delete("/destinations/comments/:commentId", verifyUser, remove);

module.exports = router;
