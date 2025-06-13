import api from "./api";


const deletePedido = async (id) => {
  const res = await api.delete(`/api/pedidos/meus-pedidos/${id}`);
  return res.data;
};

const deleteProduto = async (id) => {
  const res = await api.delete(`/api/produtos/meus-produtos/${id}`);
  return res.data;
};







export const deleteService = { deletePedido, deleteProduto };