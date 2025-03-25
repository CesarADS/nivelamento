import axios from "axios";
import TabelaDefault from "../../components/TabelaDefault";
import { useEffect, useState } from "react";
import TitleTop from "../../components/TitleTop";

export default function Listagem_usuarios() {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
      axios
        .get("http://localhost:3001/usuarios?status=ativo")
        .then((response) => {
          setUsuarios(response.data);
        })
        .catch((error) => {
          alert("Erro ao buscar os usuários:", error);
        });
    }, []);

    const colunas = ["usuario", "email", "senha", "cep", "rua", "bairro", "cidade", "estado"];

  return (
    <div>
        <TitleTop>👤 Usuários cadastrados</TitleTop>
      <TabelaDefault colunas={colunas} dados={usuarios}/>
    </div>
  )
}