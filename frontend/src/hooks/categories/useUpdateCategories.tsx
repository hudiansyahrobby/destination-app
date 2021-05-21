import { QueryClient, useMutation } from "react-query";
import { useHistory } from "react-router";
import { updateCategoryById } from "../../API/categoriesAPI";

const useUpdateCategory = () => {
  const history = useHistory();
  const queryClient = new QueryClient();
  return useMutation(updateCategoryById, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      history.push("/admin/categories");
    },
  });
};

export default useUpdateCategory;
