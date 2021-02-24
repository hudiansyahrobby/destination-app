import axios from "../axios";
import { LoginData, RegisterData } from "../interface/AuthInterface";

export const signup = async (userData: RegisterData) => {
  await axios.post("/signup", userData);
};

export const login = async (userData: LoginData) => {
  await axios.post("/login", userData);
};

export const logout = async () => {
  await axios.post("/logout");
};

export const generateRefreshToken = async () => {
  await axios.post("/refresh-token");
};
