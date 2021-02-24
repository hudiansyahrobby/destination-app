import axios from "../axios";

export const toggleFavorite = async (destinationId: number) => {
  axios.post(`/favorites/${destinationId}`);
};

export const getFavorite = async () => {
  axios.get("/favorites");
};
