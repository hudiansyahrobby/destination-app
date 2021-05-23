import { QueryClient, useMutation } from "react-query";
import { useHistory } from "react-router";
import { addDestination } from "../API/destinationAPI";

const useAddDestination = () => {
  const queryClient = new QueryClient();
  const history = useHistory();

  return useMutation(addDestination, {
    onSuccess: () => {
      queryClient.invalidateQueries("destinations");
      history.push("/admin/destinations");
    },
  });
};

export default useAddDestination;
