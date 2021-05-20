import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { logout } from "../API/authAPI";

const useLogout = () => {
  const history = useHistory();
  return useMutation(logout, {
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      history.push("/login");
    },
  });
};

export default useLogout;
