import axios from "../axios";
import { CategoryData } from "../interfaces/CategoryInterface";

export const addCategory = async (categoryData: CategoryData) => {
  const { data } = await axios.post("/categories", categoryData);
  return data;
};

export const getCategoryById = async (categoryId: number) => {
  const { data } = await axios.get(`/categories/${categoryId}`);
  return data.data;
};

export const getAllCategories = async () => {
  const { data } = await axios.get("/categories");
  return data.data;
};

export const updateCategoryById = async (categoryData: any) => {
  const { data } = await axios.put(`/categories/${categoryData.id}`, {
    name: categoryData.name,
  });
  return data;
};

export const deleteCategoryById = async (categoryId: number) => {
  const { data } = await axios.delete(`/categories/${categoryId}`);
  return data;
};
