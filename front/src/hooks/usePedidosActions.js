import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function usePedidoActions(idPedido) {
  const navigate = useNavigate();
  const [sucesso, setSucesso] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const salvarPedido = async (pedidoData) => {
    setCarregando(true);

    try {
      await axios.put(`http://localhost:3001/pedidos/${idPedido}`, {
        nome: pedidoData.nome,
        produtos: pedidoData.produtos,
        valor: pedidoData.valorTotal,
        data: pedidoData.data,
        status: "ativo"
      });

      setSucesso("Pedido atualizado com sucesso!");
      setTimeout(() => navigate("/visualizar-pedidos"), 1500);
    } catch (error) {
      console.error("Erro:", error);
      throw new Error("Erro ao atualizar pedido. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return { salvarPedido, sucesso, setSucesso, carregando };
}