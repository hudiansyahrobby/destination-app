import axios from "../axios";
import { DestinationData } from "../interface/DestinationInterface";

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

export const getAllDestinations = async () => {
  await axios.get("/destinations");
};

export const getDestination = async (id: number) => {
  await axios.get(`/destinations/${id}`);
};
