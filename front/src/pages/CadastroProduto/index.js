import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleTop from "../../components/TitleTop";
import ModalBootstrap from "../../components/ModalBootstrap";
import Alert from "../../components/Alert";
import { cadastroService } from "../../service/cadastro.service";

export default function CadastroProduto() {
  const [exibirModal, setExibirModal] = useState(false);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const [produto, setProduto] = useState({
    nome: "",
    descricao: "", 
    preco: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!produto.nome.trim()) {
      setAlert({ message: "O nome do produto é obrigatório!", type: "warning" });
      return false;
    }

    if (!produto.descricao.trim()) {
      setAlert({ message: "A descrição é obrigatória!", type: "warning" });
      return false;
    }

    const preco = parseFloat(produto.preco);
    if (isNaN(preco)) {
      setAlert({ message: "Preço inválido!", type: "warning" });
      return false;
    }

    if (preco <= 0) {
      setAlert({ message: "O preço deve ser maior que zero!", type: "warning" });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setExibirModal(true);
    }
  };

  const cadastrarProduto = async () => {
    setExibirModal(false);
    setLoading(true);
    
    try {
      const dadosProduto = {
        nome: produto.nome,
        descricao: produto.descricao,
        preco: parseFloat(produto.preco)
      };

      await cadastroService.cadastroProduto(dadosProduto);
      
      setAlert({
        message: "Produto cadastrado com sucesso! Redirecionando...",
        type: "success"
      });
      
      setTimeout(() => navigate("/visualizar-produtos"), 2000);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      setAlert({
        message: error.response?.data?.message || "Erro ao cadastrar produto. Tente novamente.",
        type: "danger"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <TitleTop>📦 Cadastro de Produto</TitleTop>
          
          <ModalBootstrap
            titulo="Confirmação de Cadastro"
            texto={`Você está prestes a cadastrar o produto: ${produto.nome}. Deseja continuar?`}
            botaoConfirmar={cadastrarProduto}
            botaoCancelar={() => setExibirModal(false)}
            exibir={exibirModal}
            setExibir={setExibirModal}
            confirmarDisabled={loading}
          />

          <form onSubmit={handleSubmit} className="card shadow-sm p-4">
            {alert && (
              <div className="mb-3">
                <Alert 
                  message={alert.message} 
                  type={alert.type} 
                  onClose={() => setAlert(null)} 
                />
              </div>
            )}

            <div className="row g-3">
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <label htmlFor="nome" className="form-label fw-bold text-muted mb-2">
                    Nome do Produto *
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="nome"
                    name="nome"
                    placeholder="Digite o nome do produto"
                    value={produto.nome}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group mb-3">
                  <label htmlFor="descricao" className="form-label fw-bold text-muted mb-2">
                    Descrição *
                  </label>
                  <textarea
                    className="form-control form-control-lg"
                    id="descricao"
                    name="descricao"
                    placeholder="Descreva o produto detalhadamente"
                    value={produto.descricao}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    rows={4}
                    style={{ minHeight: '100px' }}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="preco" className="form-label fw-bold text-muted mb-2">
                    Preço (R$) *
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">R$</span>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      id="preco"
                      name="preco"
                      placeholder="0,00"
                      value={produto.preco}
                      onChange={handleChange}
                      step="0.01"
                      min="0.01"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 mt-4">
                <div className="d-flex justify-content-end gap-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4 py-2"
                    onClick={() => navigate("/visualizar-produtos")}
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4 py-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Cadastrando...
                      </>
                    ) : (
                      "Cadastrar Produto"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}