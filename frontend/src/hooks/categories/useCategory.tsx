import { QueryClient, useQuery } from "react-query";
import { getCategoryById } from "../../API/categoriesAPI";

const useCategory = (categoryId: number) => {
  const queryClient: any = new QueryClient();
  return useQuery(
    ["categories", categoryId],
    () => getCategoryById(categoryId),
    {
      initialData: () => {
        return queryClient
          .getQueryData("categories")
          ?.find((category: any) => category.id === categoryId);
      },
      enabled: !!categoryId,
    }
  );
};

export default useCategory;
