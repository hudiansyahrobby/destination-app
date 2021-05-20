const useAuthenticated = () => {
  const isAuthenticated = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  let isAdmin = false;
  if (user) {
    const _user = JSON.parse(user);
    isAdmin = _user.isAdmin;
  }

  return { isAuthenticated, isAdmin };
};

export default useAuthenticated;
