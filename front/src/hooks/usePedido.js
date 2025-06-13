import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export function usePedido() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idPedido = queryParams.get("id");

  const [pedido, setPedido] = useState({
    nome: "",
    produtos: [],
    valorTotal: 0,
    data: ""
  });
  const [todosProdutos, setTodosProdutos] = useState([{
    id: 1,
    nome: "Café com leite",
    quantidade: 1,  
    preco: 10,
    descicao: 'xawda',
  },
  {
    id: 2,
    nome: "Café com leite",
    quantidade: 1,  
    preco: 10,
    descicao: 'xawda',
  },


]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [resPedido, resProdutos] = await Promise.all([
          axios.get(`http://localhost:3001/pedidos/${idPedido}`),
          axios.get("http://localhost:3001/produtos?status=ativo")
        ]);

        setPedido({
          nome: resPedido.data.nome,
          produtos: resPedido.data.produtos || [],
          valorTotal: resPedido.data.valor || 0,
          data: resPedido.data.data || new Date().toLocaleDateString("pt-BR")
        });

        setTodosProdutos(resProdutos.data);
      } catch (error) {
        setErro("Erro ao carregar dados do pedido. Tente novamente.");
        console.error("Erro:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, [idPedido]);

  useEffect(() => {
    const novoTotal = pedido.produtos.reduce(
      (total, item) => total + (item.preco * item.quantidade),
      0
    );
    setPedido(prev => ({ ...prev, valorTotal: novoTotal }));
  }, [pedido.produtos]);

  const adicionarProduto = (produto) => {
    const produtoExistente = pedido.produtos.find(p => p.id === produto.id);
    
    if (produtoExistente) {
      atualizarQuantidade(produto.id, produtoExistente.quantidade + 1);
    } else {
      setPedido(prev => ({
        ...prev,
        produtos: [...prev.produtos, { ...produto, quantidade: 1 }]
      }));
    }
  };

  const removerProduto = (id) => {
    setPedido(prev => ({
      ...prev,
      produtos: prev.produtos.filter(p => p.id !== id)
    }));
  };

  const atualizarQuantidade = (id, quantidade) => {
    if (quantidade < 1) return;

    setPedido(prev => ({
      ...prev,
      produtos: prev.produtos.map(p =>
        p.id === id ? { ...p, quantidade } : p
      )
    }));
  };

  const limparProdutos = () => {
    setPedido(prev => ({ ...prev, produtos: [] }));
  };

  return {
    pedido,
    setPedido,
    todosProdutos,
    carregando,
    erro,
    setErro,
    adicionarProduto,
    removerProduto,
    atualizarQuantidade,
    limparProdutos
  };
}