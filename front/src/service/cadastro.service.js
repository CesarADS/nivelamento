import api from "./api";



const cadastroVendedor = async (cadastroVendedorRequest) => {
  console.log(cadastroVendedorRequest);
  const res = await api.post("/api/vendedores/registrar", cadastroVendedorRequest);
  return res.data;
};
// /api/clientes/registrar
const cadastroCliente = async (cadastroClienteRequest) => {
  const res = await api.post("/api/clientes/registrar", cadastroClienteRequest);
  return res.data;
};
// /api/produtos/meus-produtos
const cadastroProduto = async (cadastroProdutoRequest) => {
  const res = await api.post("/api/produtos/meus-produtos", cadastroProdutoRequest);
  return res.data;
};

const cadastroPedido = async (cadastroPedidoRequest) => {
  const res = await api.post("/api/pedidos", cadastroPedidoRequest);
  return res.data;
};

export const cadastroService = { cadastroVendedor, cadastroCliente, cadastroProduto, cadastroPedido };
