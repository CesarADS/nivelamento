import { useEffect, useState } from "react";
import axios from "axios";
import TitleTop from "../../components/TitleTop";
import Alert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adicionarProduto } from "../../redux/cartSlice"; // Importe a action do seu slice
import { visualizarService } from "../../service/visualizar.service";
export default function VisualizarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const dispatch = useDispatch();
  const fetchProdutos = async () => {
      try {
        const response = await visualizarService.visualizarProdutos();
        setProdutos(response);
      } catch (error) {
        setAlert({
          message: "Erro ao carregar produtos. Tente novamente mais tarde.",
          type: "danger"
        });
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setIsLoading(false);
      }
    };
  useEffect(() => { fetchProdutos(); }, []);
 

  const fecharAlert = () => setAlert(null);

  const handleAdicionarAoCarrinho = (produto) => {
    dispatch(adicionarProduto({ ...produto, quantidade: 1 }));
    setAlert({
      message: `${produto.nome} adicionado ao carrinho!`,
      type: "success"
    });
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <TitleTop>
            <i className="bi bi-shop me-2"></i>
            Nossos Produtos
          </TitleTop>
          
          {alert && (
            <Alert 
              message={alert.message} 
              type={alert.type} 
              onClose={fecharAlert} 
              className="mb-4"
            />
          )}

          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {produtos.map((produto) => (
              <div key={produto.id} className="col">
                <div className="card h-100 shadow-sm border-0">
                 
                  
                  <div className="card-body">
                    <h5 className="card-title">{produto.nome}</h5>
                    <p className="card-text text-muted small" style={{ minHeight: "50px" }}>
                      {produto.descricao.length > 80 
                        ? `${produto.descricao.substring(0, 80)}...` 
                        : produto.descricao}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h5 text-primary">
                        R$ {Number(produto.preco).toFixed(2)}
                      </span>
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleAdicionarAoCarrinho(produto)}
                      >
                        <i className="bi bi-cart-plus me-1"></i>
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}