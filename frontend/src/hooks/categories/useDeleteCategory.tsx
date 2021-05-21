import { QueryClient, useMutation } from "react-query";
import { deleteCategoryById } from "../../API/categoriesAPI";

const useDeleteCategory = () => {
  const queryClient = new QueryClient();
  return useMutation(deleteCategoryById, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
};

export default useDeleteCategory;
