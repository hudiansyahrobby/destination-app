export const getQuery = (query: string) => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let queryValue = params.get(query);
  return queryValue;
};

export const setQuery = (
  queryName: string,
  queryParam: string,
  history: any
) => {
  let currentUrlParams = new URLSearchParams(window.location.search);
  currentUrlParams.set(queryName, queryParam);
  history.push(window.location.pathname + "?" + currentUrlParams.toString());
};
