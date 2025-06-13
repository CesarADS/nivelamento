import { BsTrash } from "react-icons/bs";
import { ModalProdutos } from "../ModalProdutos";

export function ProdutosCard({ 
  pedido, 
  todosProdutos, 
  onAdicionarProduto, 
  onRemoverProduto, 
  onAtualizarQuantidade 
}) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Produtos</h5>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#selecionarProdutosModal"
        >
          <i className="bi bi-plus-lg me-1"></i> Adicionar
        </button>
      </div>
      <div className="card-body">
        {pedido.produtos.length === 0 ? (
          <div className="text-center py-4 text-muted">
            <i className="bi bi-cart-x fs-1"></i>
            <p className="mt-2">Nenhum produto adicionado</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Qtd</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pedido.produtos.map((produto) => (
                  <tr key={produto.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          className="bg-light rounded me-2"
                          style={{
                            width: "40px",
                            height: "40px"
                          }}
                        >
                          <i className="bi bi-image text-muted w-100 h-100 d-flex justify-content-center align-items-center"></i>
                        </div>
                        <div>
                          <div className="fw-bold">{produto.nome}</div>
                          <small className="text-muted">
                            {produto.descricao?.substring(0, 30)}...
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>R$ {produto.preco.toFixed(2)}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() =>
                            onAtualizarQuantidade(
                              produto.id,
                              produto.quantidade - 1
                            )
                          }
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <input
                          type="number"
                          min="1"
                          className="form-control form-control-sm mx-2 text-center"
                          style={{ width: "60px" }}
                          value={produto.quantidade}
                          onChange={(e) =>
                            onAtualizarQuantidade(
                              produto.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() =>
                            onAtualizarQuantidade(
                              produto.id,
                              produto.quantidade + 1
                            )
                          }
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td className="fw-bold">
                      R$ {(produto.preco * produto.quantidade).toFixed(2)}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onRemoverProduto(produto.id)}
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ModalProdutos 
        todosProdutos={todosProdutos} 
        pedidoProdutos={pedido.produtos}
        onAdicionarProduto={onAdicionarProduto}
      />
    </div>
  );
}