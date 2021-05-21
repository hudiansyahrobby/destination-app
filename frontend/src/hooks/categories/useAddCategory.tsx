import { QueryClient, useMutation } from "react-query";
import { addCategory } from "../../API/categoriesAPI";

const useAddCategory = () => {
  const queryClient = new QueryClient();
  return useMutation(addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
};

export default useAddCategory;
