import { CategoryData } from "../interfaces/CategoryInterface";
import { capitalizeEachWord } from "./capitalizeEachWord";

type categoryParams = CategoryData & {
  id: string;
};

export const getCategoryOption = (categories: categoryParams[]) => {
  const options = categories?.map((category: { id: string; name: string }) => {
    return {
      value: category?.id,
      label: capitalizeEachWord(category?.name),
    };
  });

  return options;
};
