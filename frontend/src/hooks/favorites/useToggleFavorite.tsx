import { QueryClient, useMutation } from "react-query";
import { toggleFavorite } from "../../API/favoriteAPI";

const useToggleFavorite = () => {
  const queryClient = new QueryClient();
  return useMutation(toggleFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries("favorites");
    },
  });
};

export default useToggleFavorite;
