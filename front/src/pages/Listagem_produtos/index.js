import axios from "axios";
import TabelaDefault from "../../components/TabelaDefault";
import { useEffect, useState } from "react";
import TitleTop from "../../components/TitleTop";

export default function Listagem_produtos() {

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
      axios
        .get("http://localhost:3001/produtos?status=ativo")
        .then((response) => {
          setProdutos(response.data);
        })
        .catch((error) => {
          alert("Erro ao buscar os usuários:", error);
        });
    }, []);

    const colunas = ["nome", "descricao", "preco"];

  return (
    <div>
      <TitleTop>📦 Produtos cadastrados</TitleTop>
      <TabelaDefault colunas={colunas} dados={produtos} />
    </div>
  );
}