import { useInfiniteQuery } from "react-query";
import { getAllDestinations } from "../API/destinationAPI";
import { getQuery } from "../helpers/query";

const searchQuery = getQuery("search");

const fetchDestinations = ({ pageParam = 0 }) => {
  if (searchQuery) {
    return getAllDestinations(pageParam, searchQuery);
  }
  return getAllDestinations(pageParam);
};

const useDestinations = () => {
  return useInfiniteQuery("destinations", fetchDestinations, {
    getNextPageParam: (lastPage, pages) => {
      const hasNextPage = lastPage.currentPage + 1 < lastPage.totalPages;
      let nextPage = false;
      if (hasNextPage) {
        nextPage = lastPage.currentPage + 1;
      }

      return nextPage;
    },
  });
};

export default useDestinations;
