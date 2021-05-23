import { QueryClient, useMutation } from "react-query";
import { deleteDestination } from "../API/destinationAPI";

const useDeleteDestination = () => {
  const queryClient = new QueryClient();
  return useMutation(deleteDestination, {
    onSuccess: () => {
      queryClient.invalidateQueries("destinations");
    },
  });
};

export default useDeleteDestination;
