import api from "./api";

// /api/pedidos/meus-pedidos/{id}

const visualizarMeusPedidosbyId = async (id) => {
  const res = await api.get(`/api/pedidos/meus-pedidos/${id}`);
  return res.data;
};

// /api/pedidos/meus-pedidos

const visualizarMeusPedidos = async () => {
  const res = await api.get("/api/pedidos/meus-pedidos");
  return res.data;
};

const visualizarMeuPerfilCliente = async () => {
  const res = await api.get("/api/clientes/meu-perfil");
  return res.data;
};

const visualizarMeuPerfilVendedor = async () => {
  const res = await api.get("/api/vendedores/meu-perfil");
  return res.data;
};

const visualizarMeuPerfilAdmin = async () => {
  const res = await api.get("/api/admin/meu-perfil");
  return res.data;
};

const visualizarItensVendidos = async () => {
  const res = await api.get("/api/vendedores/meus-itens-vendidos");
  return res.data;
};

const visualizarProdutos = async () => {
  // /api/produtos
  const res = await api.get("/api/produtos");
  return res.data;
};

const visualizarProdutoById = async (id) => {
  const res = await api.get(`/api/produtos/${id}`);
  return res.data;
};

export const visualizarService = {
  visualizarMeusPedidosbyId,
  visualizarMeusPedidos,
  visualizarMeuPerfilCliente,
  visualizarMeuPerfilVendedor,
  visualizarMeuPerfilAdmin,
  visualizarItensVendidos,
  visualizarProdutos,
  visualizarProdutoById
};
