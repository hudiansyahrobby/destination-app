import axios from "../axios";

export const addDestination = async (destinationData: any) => {
  const { data } = await axios.post("/destinations", destinationData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return data;
};

export const updateDestination = async (destinationData: any) => {
  const { data } = await axios.put(
    `/destinations/${destinationData.id}`,
    destinationData
  );
  return data;
};

export const deleteDestination = async (id: number) => {
  const { data } = await axios.delete(`/destinations/${id}`);
  return data;
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
