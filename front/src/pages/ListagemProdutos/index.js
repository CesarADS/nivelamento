import axios from "axios";
import TabelaDefault from "../../components/TabelaDefault";
import { useEffect, useState } from "react";
import TitleTop from "../../components/TitleTop";
import { visualizarService } from "../../service/visualizar.service";
export default function ListagemProdutos() {

    const [produtos, setProdutos] = useState([]);

    const fetchProdutos = async () => {
      try {
        const response = await visualizarService.visualizarProdutos();
        console.log(response);
        setProdutos(response);
      } catch (error) {
        console.error("Erro ao buscar os usuários:", error);
      }
    };
    useEffect(() => { fetchProdutos(); }, []);

    const colunas = ["id", "nome", "descricao", "preco"];
  return (
    <div>
      <TitleTop>📦 Produtos cadastrados</TitleTop>
      <TabelaDefault colunas={colunas} dados={produtos} setDados={setProdutos} />
    </div>
  );
}