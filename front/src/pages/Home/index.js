import React from "react";
import { useNavigate } from "react-router-dom";
import TitleTop from "../../components/TitleTop";

export default function Home() {
  const navigate = useNavigate();

  const irParaCadastroPedido = () => {
    navigate("/cadastro-produto");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-3 mb-4">
      <TitleTop>📦 Sistema de Cadastro de Pedidos</TitleTop>

      <div className="p-4 shadow rounded col-md-10 col-lg-8 mt-5">
        <h3 className="mb-3">Bem-vindo ao sistema de cadastro de pedidos!</h3>
        <p>
          Aqui você pode cadastrar pedidos, visualizar pedidos existentes e
          muito mais. <br />O sistema é simples e intuitivo, permitindo o
          cadastro rápido de pedidos com produtos
          <br /> selecionados. Antes de cadastrar um pedido, lembre-se de ter
          produtos cadastrados.
        </p>
        <div className="mt-4">
          <button
            className="btn btn-primary bg-dark border-dark mt-4 mb-2"
            onClick={irParaCadastroPedido}
          >
            Cadastrar um produto
          </button>
        </div>
      </div>
    </div>
  );
}
