import { BsPlus } from "react-icons/bs";

export function ModalProdutos({ todosProdutos, pedidoProdutos, onAdicionarProduto }) {
  return (
    <div className="modal fade show " id="selecionarProdutosModal" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Selecionar Produtos</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row row-cols-1 row-cols-md-2 g-3">
              {todosProdutos
                .filter((produto) => !pedidoProdutos.some((p) => p.id === produto.id))
                .map((produto) => (
                  <div key={produto.id} className="col">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="card-title">{produto.nome}</h6>
                        <p className="card-text text-muted small">
                          {produto.descricao?.substring(0, 100)}...
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold text-primary">
                            R$ {produto.preco.toFixed(2)}
                          </span>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => {
                              onAdicionarProduto(produto);
                              document
                                .getElementById("selecionarProdutosModal")
                                .querySelector(".btn-close")
                                .click();
                            }}
                          >
                            <BsPlus className="me-1" /> Adicionar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}