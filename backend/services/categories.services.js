const AppError = require("../errorHandler/AppError");
const { Categories } = require("../models");

const createNewCategory = async (name) => {
  const [category, created] = await Categories.findOrCreate({
    where: { name },
    defaults: {
      name,
    },
  });
  console.log("CREATED", created);
  if (!created) {
    console.log("HAHAHHA");
    throw new AppError(
      `Category with name ${name} is already exist`,
      400,
      "already-exist"
    );
  }

  return category;
};

const findCategoryById = async (id) => {
  const category = await Categories.findOne({ where: { id } });

  if (!category) {
    throw new AppError(`Category with ID ${id} not found`, 404, "not-found");
  }

  return category;
};

const findAllCategories = async () => {
  const categories = await Categories.findAll();
  return categories;
};

const deleteCategoryById = async (id) => {
  const category = await findCategoryById(id);

  await Categories.destroy({
    where: {
      id,
    },
  });

  return category;
};

const updateCategoryById = async (id, updatedCategories) => {
  await findCategoryById(id);

  const [_, _updatedCategory] = await Categories.update(updatedCategories, {
    where: {
      id,
    },
    returning: true,
  });

  return _updatedCategory[0];
};

module.exports = {
  updateCategoryById,
  deleteCategoryById,
  findAllCategories,
  findCategoryById,
  createNewCategory,
};
