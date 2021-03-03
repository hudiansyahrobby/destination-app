import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { login } from "../API/authAPI";

const useLogin = () => {
  const history = useHistory();
  return useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem("token", "TEST");
      history.push("/");
    },
  });
};

export default useLogin;
