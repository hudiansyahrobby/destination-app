exports.getSort = (sort) => {
  let sortBy;
  switch (sort) {
    case "latest":
      sortBy = ["createdAt", "DESC"];
      break;
    case "oldest":
      sortBy = ["createdAt", "ASC"];
    default:
      break;
  }
  return sortBy;
};
