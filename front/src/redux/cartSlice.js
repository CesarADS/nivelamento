import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  produtos: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    adicionarProduto: (state, action) => {
  const produtoExistente = state.produtos.find(item => item.id === action.payload.id);

  if (produtoExistente) {
    produtoExistente.quantidade += 1;
  } else {
    // Se o produto não existe, adiciona com quantidade inicial (1 ou a passada no payload)
    state.produtos.push({ ...action.payload, quantidade: action.payload.quantidade || 1 });
  }
},

    removerProduto: (state, action) => {
      state.produtos = state.produtos.filter(item => item.id !== action.payload);
    },
    limparCarrinho: (state) => {
      state.produtos = [];
    },
    atualizarQuantidade: (state, action) => {
      const { id, quantidade } = action.payload;
      const produto = state.produtos.find(item => item.id === id);
      if (produto) {
        produto.quantidade = quantidade;
      }
    }
  }
});

// Função auxiliar para calcular o total (pode ser usada nos componentes)
export const calcularTotal = (produtos) => {
  return produtos.reduce((total, item) => total + (item.preco * item.quantidade), 0);
};

export const { adicionarProduto, removerProduto, limparCarrinho, atualizarQuantidade } = cartSlice.actions;
export default cartSlice.reducer;