import axios from "axios";
import TabelaDefault from "../../components/TabelaDefault";
import { useEffect, useState } from "react";
import TitleTop from "../../components/TitleTop";

export default function Listagem_pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/pedidos?status=ativo")
      .then((response) => {
        const pedidosFormatados = response.data.map((pedido) => ({
          ...pedido, // Mantém os outros atributos do pedido
          produtos: pedido.produtos
            .map((item) => `${item.nome} (${item.quantidade} UN)`)
            .join(", "), // Transforma os produtos em uma string
          valor: `R$${pedido.valor.toFixed(2)}`, // Adiciona "R$" antes do valor e formata para 2 casas decimais
        }));

        setPedidos(pedidosFormatados);
      })
      .catch((error) => {
        alert("Erro ao buscar os pedidos:", error);
      });
  }, []);

  const colunas = ["nome", "produtos", "valor", "data"];

  return (
    <div>
      <TitleTop>📦 Pedidos cadastrados</TitleTop>
      <TabelaDefault colunas={colunas} dados={pedidos} />
    </div>
  );
}
