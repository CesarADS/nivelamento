import axios from "axios";
import TabelaDefault from "../../components/TabelaDefault";
import { useEffect, useState } from "react";
import TitleTop from "../../components/TitleTop";

export default function Listagem_usuarios() {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
      axios
        .get("http://localhost:3001/jogadores")
        .then((response) => {
          setUsuarios(response.data);
        })
        .catch((error) => {
          alert("Erro ao buscar os jogadores:", error);
        });
    }, []);

    const colunas = ["nome", "wins", "loses", "age", "login", "senha", "id"];

  return (
    <div>
        <TitleTop>👤 Usuários Cadastrados</TitleTop>
      <TabelaDefault colunas={colunas} dados={usuarios}/>
    </div>
  )
}