import TitleTop from "../../components/TitleTop";
import InputForm from "../../components/InputForm";
import { useState } from "react";
import axios from "axios";
import ModalBootstrap from "../../components/ModalBootstrap";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

export default function Cadastro_produto() {
  const [exibirModal, setExibirModal] = useState(false);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const fecharAlert = () => {
    setAlert(null);
  };

  // Estado para armazenar os dados dos inputs
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  function botaoConfirmar() {

    setExibirModal(false);

    axios
      .post("http://localhost:3001/produtos", {
        nome: nome,
        descricao: descricao,
        preco: preco,
        status: "ativo"
      })
      .then((response) => {
        setAlert({
          message: "Produto cadastrado com sucesso! Redirecionando...",
          type: "success",
        });
        setTimeout(() => {
          navigate("/visualizar-produtos");
        }, 3000);
      })
      .catch((error) => {
        alert("Erro ao cadastrar:", error);
      });
   
  }

  // Corrigido: Apenas define o estado, sem retornar JSX
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      nome.length > 0 &&
      descricao.length > 0 &&
      preco.length > 0
    ) {
      setExibirModal(true);
    } else {
      setAlert({
        message: "Preencha todos os campos!",
        type: "warning",
      });
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-3 mb-4">
      <ModalBootstrap
        titulo="Cadastro de produto"
        texto={`Você está prestes a cadastrar o produto: ${nome}. Deseja continuar?`}
        botaoConfirmar={botaoConfirmar}
        botaoCancelar={() => setExibirModal(false)}
        exibir={exibirModal}
        setExibir={setExibirModal}
      />

      <TitleTop>📦 Cadastro de produto</TitleTop>
      <form
        className="p-4 shadow rounded col-md-10 col-lg-8"
        onSubmit={handleSubmit}
      >
        <div className="form-row">
          <InputForm
            label="Nome:"
            type="text"
            id="inputNome"
            placeholder="Digite o nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <InputForm
            label="Descrição:"
            type="text"
            id="inputDesc"
            placeholder="Digite a descrição do produto"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <InputForm
            label="Preço:"
            type="number"
            id="inputPreco"
            placeholder="Digite o preço do produto"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
          <div className="mt-4">
            {alert && (
              <Alert
                message={alert.message}
                type={alert.type}
                onClose={fecharAlert}
              />
            )}
          </div>
          <div className="row botaoCadastro">
            <button
              type="submit"
              className="btn btn-primary bg-dark border-dark mt-4 mb-2 col-md-2"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
