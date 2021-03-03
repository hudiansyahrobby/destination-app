import { QueryClient, useQuery } from "react-query";
import { getDestination } from "../API/destinationAPI";

const useDestination = (destinationId: number) => {
  const queryClient: any = new QueryClient();
  return useQuery(
    ["destinations", destinationId],
    () => getDestination(destinationId),
    {
      initialData: () => {
        return queryClient
          .getQueryData("destinations")
          ?.find((destination: any) => destination.id === destinationId);
      },
    }
  );
};

export default useDestination;
