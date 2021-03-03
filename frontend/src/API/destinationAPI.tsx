import axios from "../axios";
import { DestinationData } from "../interfaces/DestinationInterface";

export const addDestination = async (destinationData: DestinationData) => {
  await axios.post("/destinations", destinationData);
};

export const updateDestination = async (
  destinationData: DestinationData,
  id: number
) => {
  await axios.put(`/destinations/${id}`, destinationData);
};

export const deleteDestination = async (id: number) => {
  await axios.delete(`/destinations/${id}`);
};

export const getAllDestinations = async (page = 0, title?: string) => {
  let endpoint = `/destinations?page=${page}`;
  if (title) {
    endpoint += `&title=${title}`;
  }
  const { data } = await axios.get(endpoint);
  return data.destinations;
};

export const getDestination = async (id: number) => {
  const { data } = await axios.get(`/destinations/${id}`);
  return data.destination;
};
