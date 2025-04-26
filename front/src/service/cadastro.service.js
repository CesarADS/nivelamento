import api from "./api";

const cadastrar = async (cadastroRequest) => {
  const res = await api.post("usuario", cadastroRequest);
  return res.data;
};

const consultar = async () => {
  const res = await api.post("usuario");
  return res.data;
};

const consultarPorId = async (id) => {
  const res = await api.post("usuario/" + id);
  return res.data;
};

export const cadastroService = { login, cadastrar, consultar, consultarPorId };
