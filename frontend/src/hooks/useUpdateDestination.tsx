import { QueryClient, useMutation } from "react-query";
import { useHistory } from "react-router";
import { updateDestination } from "../API/destinationAPI";

const useUpdateDestination = () => {
  const history = useHistory();
  const queryClient = new QueryClient();
  return useMutation(updateDestination, {
    onSuccess: () => {
      queryClient.invalidateQueries("destinations");
      history.push("/admin/destinations");
    },
  });
};

export default useUpdateDestination;
