const categoryService = require("../services/categories.services");
const catchAsync = require("../errorHandler/catchAsync");

const create = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const category = await categoryService.createNewCategory(name);
  return res.status(201).json({
    message: "Category successfully created",
    data: category,
    status: 201,
  });
});

const findCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await categoryService.findCategoryById(id);

  return res.status(200).json({
    message: "OK",
    data: category,
    status: 200,
  });
});

const findAllCategories = async (req, res, next) => {
  const categories = await categoryService.findAllCategories();

  return res.status(200).json({
    message: "OK",
    data: categories,
    status: 200,
  });
};

const deleteCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await categoryService.deleteCategoryById(id);

  return res.status(200).json({
    message: "Category deleted successfully",
    data: category,
    status: 200,
  });
});

const updateCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedCategory = {
    ...req.body,
  };
  const category = await categoryService.updateCategoryById(
    id,
    updatedCategory
  );

  return res.status(200).json({
    message: "Category updated successfully",
    data: category,
    status: 200,
  });
});

module.exports = {
  updateCategoryById,
  deleteCategoryById,
  findAllCategories,
  findCategoryById,
  create,
};
