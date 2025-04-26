import api from "./api";

const login = async (loginRequest) => {
  const res = await api.post("auth/login", loginRequest);
  return res.data;
};

export const authService = { login };
