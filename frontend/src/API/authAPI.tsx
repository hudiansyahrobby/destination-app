import axios from "../axios";
import { LoginData, RegisterData } from "../interfaces/AuthInterface";

export const signup = async (userData: RegisterData) => {
  const { data } = await axios.post("/signup", userData);
  return data;
};

export const login = async (userData: LoginData) => {
  const { data } = await axios.post("/login", userData);
  console.log("LGIN", data);
  return data;
};

export const logout = async () => {
  const { data } = await axios.post("/logout");
  return data;
};

export const generateRefreshToken = async () => {
  const { data } = await axios.post("/refresh-token");
  return data;
};
