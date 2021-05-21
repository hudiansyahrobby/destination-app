import { useQuery } from "react-query";
import { getAllCategories } from "../../API/categoriesAPI";

const useCategories = () => {
  return useQuery("categories", getAllCategories);
};

export default useCategories;
