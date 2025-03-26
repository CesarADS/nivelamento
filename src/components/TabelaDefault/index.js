import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "../Alert";
import ModalBootstrap from "../ModalBootstrap";

const TabelaDefault = ({ colunas, dados }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [exibirModal, setExibirModal] = useState(false);
  const [itemParaExcluir, setItemParaExcluir] = useState(null);
  const [rowIndexParaExcluir, setRowIndexParaExcluir] = useState(null);
  const [nomeItemExcluir, setNomeItemExcluir] = useState("");

  const fecharAlert = () => {
    setAlert(null);
  };

  function onEditar(item) {
    if (location.pathname === "/visualizar-usuarios") {
      navigate("/editar-usuario?id=" + item.id);
    } else if (location.pathname === "/visualizar-produtos") {
      navigate("/editar-produto?id=" + item.id);
    } else if (location.pathname === "/visualizar-pedidos") {
      navigate("/editar-pedido?id=" + item.id);
    }
  }

  function confirmarExclusao() {
    if (!itemParaExcluir || rowIndexParaExcluir === null) return;

    if (location.pathname === "/visualizar-usuarios") {
      axios
        .put(`http://localhost:3001/usuarios/${itemParaExcluir.id}`, {
          id: itemParaExcluir.id,
          usuario: itemParaExcluir.usuario,
          email: itemParaExcluir.email,
          senha: itemParaExcluir.senha,
          cep: itemParaExcluir.cep,
          rua: itemParaExcluir.rua,
          bairro: itemParaExcluir.bairro,
          cidade: itemParaExcluir.cidade,
          estado: itemParaExcluir.estado,
          status: "excluido",
        })
        .then((response) => {
          setAlert({
            message: "Usuário excluído com sucesso!",
            type: "success",
          });

          const row = document.getElementById(`row-${rowIndexParaExcluir}`);
          if (row) {
            row.remove();
          }

          setExibirModal(false);
        })
        .catch((error) => {
          console.log("Erro ao excluir:", error);
        });
    } else if (location.pathname === "/visualizar-produtos") {
      axios
        .put(`http://localhost:3001/produtos/${itemParaExcluir.id}`, {
          id: itemParaExcluir.id,
          nome: itemParaExcluir.nome,
          descricao: itemParaExcluir.descricao,
          preco: itemParaExcluir.preco,
          status: "excluido",
        })
        .then((response) => {
          setAlert({
            message: "Produto excluído com sucesso!",
            type: "success",
          });

          const row = document.getElementById(`row-${rowIndexParaExcluir}`);
          if (row) {
            row.remove();
          }

          setExibirModal(false);
        })
        .catch((error) => {
          alert("Erro ao excluir:", error);
        });
    } else if (location.pathname === "/visualizar-pedidos") {
      axios
        .put(`http://localhost:3001/pedidos/${itemParaExcluir.id}`, {
          id: itemParaExcluir.id,
          nome: itemParaExcluir.nome,
          produtos: itemParaExcluir.produtos,
          valor: itemParaExcluir.valor,
          data: itemParaExcluir.data,
          status: "excluido",
        })
        .then((response) => {
          setAlert({
            message: "Pedido excluído com sucesso!",
            type: "success",
          });

          const row = document.getElementById(`row-${rowIndexParaExcluir}`);
          if (row) {
            row.remove();
          }

          setExibirModal(false);
        })
        .catch((error) => {
          alert("Erro ao excluir:", error);
        });
    }
  }

  function abrirModalExcluir(item, rowIndex) {

    if (location.pathname === "/visualizar-usuarios") {
      setNomeItemExcluir(item.usuario);
    } else if (location.pathname === "/visualizar-produtos") {
      setNomeItemExcluir(item.nome);
    }

    setItemParaExcluir(item);
    setRowIndexParaExcluir(rowIndex);
    setExibirModal(true);
  }

  return (
    <div className="container mt-4">
      <ModalBootstrap
        titulo="Confirmação de exclusão"
        texto={`Tem certeza que deseja excluir ${nomeItemExcluir}?`}
        botaoConfirmar={confirmarExclusao}
        botaoCancelar={() => setExibirModal(false)}
        exibir={exibirModal}
        setExibir={setExibirModal}
      />

      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={fecharAlert}
        />
      )}

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col"></th>
            {colunas.map((coluna, index) => (
              <th key={index} scope="col">
                {coluna}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.map((item, rowIndex) => (
            <tr key={rowIndex} id={`row-${rowIndex}`}>
              <td>
                <button
                  className="btn btn-dark btn-sm me-1"
                  onClick={() => onEditar(item)}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => abrirModalExcluir(item, rowIndex)}
                >
                  🗑
                </button>
              </td>
              {colunas.map((coluna, colIndex) => (
                <td key={colIndex}>{item[coluna]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaDefault;
