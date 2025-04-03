import TitleTop from "../../components/TitleTop";
import InputForm from "../../components/InputForm";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalBootstrap from "../../components/ModalBootstrap";
import { data, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import SelecionarProdutos from "../../components/SelecionarProdutos";

export default function Cadastro_pedido() {

  const [exibirModal, setExibirModal] = useState(false);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [nome, setNome] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [options, setOptions] = useState([]);

  const calcularValorTotal = () => {
    const total = produtos.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
    return total;
  };


  const fecharAlert = () => {
    setAlert(null);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/produtos?status=ativo")
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        alert("Erro ao buscar os produtos:", error);
      });
  }, []);

  function botaoConfirmar() {
    setExibirModal(false);

    const total = calcularValorTotal();

    const dataHoje = new Date().toLocaleDateString("pt-BR");

    axios
      .post("http://localhost:3001/pedidos", {
        nome: nome,
        produtos: produtos,
        valor: total,
        data: dataHoje,
        status: "ativo",
      })
      .then((response) => {
        setAlert({
          message: "Pedido cadastrado com sucesso! Redirecionando...",
          type: "success",
        });
        setTimeout(() => {
          navigate("/visualizar-pedidos");
        }, 3000);
      })
      .catch((error) => {
        alert("Erro ao cadastrar:", error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nome.length > 0) {
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
        titulo="Cadastro de pedido"
        texto={`Você está prestes a cadastrar o pedido: ${nome}. Deseja continuar?`}
        botaoConfirmar={botaoConfirmar}
        botaoCancelar={() => setExibirModal(false)}
        exibir={exibirModal}
        setExibir={setExibirModal}
      />

      <TitleTop>📒 Cadastro de pedido</TitleTop>
      <form
        className="p-4 shadow rounded col-md-10 col-lg-8"
        onSubmit={handleSubmit}
      >
        <div className="form-row">
          <InputForm
            label="Nome:"
            type="text"
            id="inputNome"
            placeholder="Digite o nome do pedido"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <SelecionarProdutos
            options={options}
            produtos={produtos}
            setProdutos={setProdutos}
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
