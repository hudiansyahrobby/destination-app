import { QueryClient, useQuery } from "react-query";
import { getCategoryById } from "../../API/categoriesAPI";

const useDestination = (categoryId: number) => {
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
    }
  );
};

export default useDestination;
