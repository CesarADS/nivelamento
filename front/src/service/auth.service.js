import api from "./api";

const login = async (loginRequest) => {
  const res = await api.post("/auth/login", loginRequest, {
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    },
  });
  return res.data;
};

export const authService = { login };
