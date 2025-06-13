import api from "./api";

const alterarPedido = async (id, dadosPedido) => {
  const res = await api.put(`/api/pedidos/meus-pedidos/${id}`, dadosPedido);
  return res.data;
};  

const alterarPerfilCliente = async (dadosPerfil) => {
  const res = await api.put("/api/clientes/meu-perfil", dadosPerfil);
  return res.data;
};

const alterarPerfilVendedor = async (dadosPerfil) => {
  const res = await api.put("/api/vendedores/meu-perfil", dadosPerfil);
  return res.data;
};

const alterarPerfilAdmin = async (dadosPerfil) => {
  const res = await api.put("/api/admin/meu-perfil", dadosPerfil);
  return res.data;
};  

const alterarProduto = async (id, dadosProduto) => {
  const res = await api.put(`/api/produtos/meus-produtos/${id}`, dadosProduto);
  return res.data;
};  

export const alterarService = { alterarPedido, alterarPerfilCliente, alterarPerfilVendedor, alterarPerfilAdmin, alterarProduto };
