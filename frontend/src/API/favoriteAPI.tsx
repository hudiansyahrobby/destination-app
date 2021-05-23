import axios from "../axios";

export const toggleFavorite = async (destinationId: number) => {
  console.log("haha", destinationId);
  const { data } = await axios.post(`/favorites/${destinationId}`);
  console.log(data);
  return data;
};

export const getFavorite = async () => {
  const { data } = await axios.get("/favorites");
  return data.favorites;
};
