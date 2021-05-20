const { Router } = require("express");

const router = Router();

const categoryValidation = require("../validations/category");
const {
  create,
  deleteCategoryById,
  findAllCategories,
  findCategoryById,
  updateCategoryById,
} = require("../controllers/categories");
const isValid = require("../middlewares/isValid");
const { verifyUser, verifyAdmin } = require("../middlewares/userAuth");

router.post(
  "/categories",
  verifyUser,
  verifyAdmin,
  isValid(categoryValidation.category, "body"),
  create
);

router.get("/categories/:id", findCategoryById);

router.get("/categories", findAllCategories);

router.put(
  "/categories/:id",
  verifyUser,
  verifyAdmin,
  isValid(categoryValidation.category, "body"),
  updateCategoryById
);

router.delete("/categories/:id", verifyUser, verifyAdmin, deleteCategoryById);

module.exports = router;
