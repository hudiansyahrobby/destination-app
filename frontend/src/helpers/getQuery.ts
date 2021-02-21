export const getQuery = (query: string) => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let queryValue = params.get(query);
  return queryValue;
};
