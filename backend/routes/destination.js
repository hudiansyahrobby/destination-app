const { Router } = require("express");

const destinationValidation = require("../validations/destination");
const { verifyUser, verifyAdmin } = require("../middlewares/userAuth");
const isValid = require("../middlewares/isValid");
const {
  create,
  get,
  getDetail,
  update,
  remove,
} = require("../controllers/destination");

const { uploadImages, resizeImages } = require("../controllers/image");

const router = Router();

router.post(
  "/destinations",
  verifyUser,
  verifyAdmin,
  uploadImages,
  resizeImages,
  isValid(destinationValidation.destination, "body"),
  create
);

router.get("/destinations", get);

router.get("/destinations/:id", getDetail);

router.put(
  "/destinations/:id",
  verifyUser,
  verifyAdmin,
  uploadImages,
  resizeImages,
  isValid(destinationValidation.destination, "body"),
  update
);

router.delete("/destinations/:id", verifyUser, verifyAdmin, remove);

module.exports = router;
