import { useQuery } from "react-query";
import { getFavorite } from "../../API/favoriteAPI";

const useFavorites = () => {
  return useQuery("favorites", getFavorite);
};

export default useFavorites;
