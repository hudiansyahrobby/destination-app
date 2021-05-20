import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { login } from "../API/authAPI";

const useLogin = () => {
  const history = useHistory();
  return useMutation(login, {
    onSuccess: (data) => {
      const user = {
        name: data.user.name,
        email: data.user.email,
        isAdmin: data.user.isAdmin,
      };
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      history.push("/");
    },
  });
};

export default useLogin;
