import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  removerProduto, 
  limparCarrinho, 
  atualizarQuantidade,
  calcularTotal
} from "../../redux/cartSlice";
import TitleTop from "../../components/TitleTop";
import Alert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft, BsDash, BsPlus, BsTrash } from "react-icons/bs";
import { cadastroService } from "../../service/cadastro.service";

export default function Carrinho() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const { produtos } = useSelector(state => state.cart);
  const total = calcularTotal(produtos);

  const fecharAlert = () => setAlert(null);

  const handleAumentarQuantidade = (produto) => {
    const novaQuantidade = produto.quantidade + 1;
    dispatch(atualizarQuantidade({ id: produto.id, quantidade: novaQuantidade }));
  };

  const handleDiminuirQuantidade = (produto) => {
    if (produto.quantidade > 1) {
      const novaQuantidade = produto.quantidade - 1;
      dispatch(atualizarQuantidade({ id: produto.id, quantidade: novaQuantidade }));
    } else {
      dispatch(removerProduto(produto.id));
      setAlert({
        message: `${produto.nome} removido do carrinho!`,
        type: "warning"
      });
    }
  };

  const handleRemoverProduto = (produto) => {
    dispatch(removerProduto(produto.id));
    setAlert({
      message: `${produto.nome} removido do carrinho!`,
      type: "warning"
    });
  };

  const handleLimparCarrinho = () => {
    dispatch(limparCarrinho());
    setAlert({
      message: "Todos os produtos foram removidos do carrinho!",
      type: "warning"
    });
  };

  const handleFinalizarPedido = async () => {
  const pedido = {
    itensPedido: produtos.map(produto => ({
      produtoId: produto.id,
      quantidade: produto.quantidade
    }))
  };

  try {
    const res = await cadastroService.cadastroPedido(pedido);
    console.log(res);

    if (res) {
      setAlert({
        message: "Pedido criado com sucesso! Redirecionando...",
        type: "success",
      });

      setTimeout(() => {
        dispatch(limparCarrinho());
        navigate("/meus-pedidos");
      }, 3000);
    } else {
      setAlert({
        message: "Erro ao criar pedido. Tente novamente.",
        type: "danger",
      });
    }
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    setAlert({
      message: error.response?.data?.message || "Erro ao criar pedido.",
      type: "danger"
    });
  }
};


  if (produtos.length === 0) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <TitleTop>
              <i className="bi bi-cart me-2"></i>
              Seu Carrinho
            </TitleTop>
            <div className="card shadow-sm">
              <div className="card-body">
                <i className="bi bi-cart-x text-muted" style={{ fontSize: "5rem" }}></i>
                <h4 className="mt-3">Seu carrinho está vazio</h4>
                <p className="text-muted">Adicione produtos para continuar</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate("/produtos")}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Voltar para a loja
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <TitleTop>
        <i className="bi bi-cart me-2"></i>
        Seu Carrinho
      </TitleTop>

      {alert && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={fecharAlert} 
          className="mb-4"
        />
      )}

      <div className="row">
        <div className="col-md-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Preço</th>
                      <th>Quantidade</th>
                      <th>Subtotal</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtos.map((produto) => (
                      <tr key={produto.id}>
                        <td>
                          <div className="d-flex align-items-center">
                          
                            <div>
                              <h6 className="mb-0">{produto.nome}</h6>
                              <small className="text-muted">{produto.descricao.substring(0, 50)}...</small>
                            </div>
                          </div>
                        </td>
                        <td>R$ {Number(produto.preco).toFixed(2)}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <button 
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => handleDiminuirQuantidade(produto)}
                            >
                              <BsDash />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={produto.quantidade}
                              onChange={(e) => dispatch(atualizarQuantidade({ 
                                id: produto.id, 
                                quantidade: parseInt(e.target.value) || 1 
                              }))}
                              className="form-control mx-2 text-center"
                              style={{ width: "60px" }}
                            />
                            <button 
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => handleAumentarQuantidade(produto)}
                            >
                              <BsPlus />
                            </button>
                          </div>
                        </td>
                        <td>R$ {(produto.preco * produto.quantidade).toFixed(2)}</td>
                        <td>
                          <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleRemoverProduto(produto)}
                          >
                            <BsTrash  />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end mb-4 gap-4">
             <button 
              className="btn btn-outline-secondary"
              onClick={() => navigate('/produtos')}
            >
              <BsArrowLeft className="me-1" />
              Voltar para a Loja
            </button>
            <button 
              className="btn btn-outline-danger me-2"
              onClick={handleLimparCarrinho}
            >
              <BsTrash className="me-1" />
              Limpar Carrinho
            </button>
           
          </div>
          
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm sticky-top" style={{ top: "20px" }}>
            <div className="card-body">
              <h5 className="mb-4">Resumo do Pedido</h5>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <span>Frete:</span>
                <span>Grátis</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <h5>Total:</h5>
                <h5>R$ {total.toFixed(2)}</h5>
              </div>
              
              <button 
                className="btn btn-primary btn-lg w-100"
                onClick={handleFinalizarPedido}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}