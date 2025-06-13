import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { usePedido } from "../../hooks/usePedido";
import { usePedidoActions } from "../../hooks/usePedidosActions";
import { PedidoInfoCard } from "../../components/PedidoInfoCard";
import { ProdutosCard } from "../../components/ProdutosCard";
import { ConfirmacaoModal } from "../../components/ConfirmacaoModal";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { ActionButtons } from "../../components/ActionButtons";

export default function EditarPedido() {
  const navigate = useNavigate();
  const {
    pedido,
    setPedido,
    todosProdutos,
    carregando,
    erro,
    setErro,
    adicionarProduto,
    removerProduto,
    atualizarQuantidade,
    limparProdutos
  } = usePedido();

  const {
    salvarPedido,
    sucesso,
    setSucesso,
    carregando: salvando
  } = usePedidoActions(pedido.id);

  const [modalConfirmacao, setModalConfirmacao] = useState(false);

  const validarFormulario = () => {
    if (!pedido.nome.trim()) {
      setErro("Informe o nome do pedido");
      return false;
    }

    if (pedido.produtos.length === 0) {
      setErro("Adicione pelo menos um produto");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro(null);

    if (validarFormulario()) {
      setModalConfirmacao(true);
    }
  };

  const handleConfirmarEdicao = async () => {
    try {
      await salvarPedido(pedido);
      setModalConfirmacao(false);
    } catch (error) {
      setErro(error.message);
      setModalConfirmacao(false);
    }
  };

  const handleLimparProdutos = () => {
    if (window.confirm("Tem certeza que deseja limpar todos os produtos?")) {
      limparProdutos();
    }
  };

  if (carregando) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <ConfirmacaoModal
        isOpen={modalConfirmacao}
        onClose={() => setModalConfirmacao(false)}
        onConfirm={handleConfirmarEdicao}
        pedido={pedido}
        carregando={salvando}
      />

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">
          <i className="bi bi-pencil-square me-2"></i>
          Editar Pedido: {pedido.nome}
        </h1>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/visualizar-pedidos")}
        >
          <BsArrowLeft className="me-1" /> Voltar
        </button>
      </div>

      <FeedbackAlert type="error" message={erro} onDismiss={() => setErro(null)} />
      <FeedbackAlert type="success" message={sucesso} />

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-4">
            <PedidoInfoCard 
              pedido={pedido} 
              onNomeChange={(nome) => setPedido({...pedido, nome})} 
            />
          </div>

          <div className="col-md-6 mb-4">
            <ProdutosCard
              pedido={pedido}
              todosProdutos={todosProdutos}
              onAdicionarProduto={adicionarProduto}
              onRemoverProduto={removerProduto}
              onAtualizarQuantidade={atualizarQuantidade}
            />
          </div>
        </div>

        <ActionButtons
          onLimparProdutos={handleLimparProdutos}
          onSubmit={handleSubmit}
          carregando={salvando}
          produtosLength={pedido.produtos.length}
        />
      </form>
    </div>
  );
}