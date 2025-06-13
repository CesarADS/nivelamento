export function PedidoInfoCard({ pedido, onNomeChange }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-header bg-light">
        <h5 className="mb-0">Informações do Pedido</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="nomePedido" className="form-label">
            Nome do Pedido *
          </label>
          <input
            type="text"
            className="form-control"
            id="nomePedido"
            value={pedido.nome}
            onChange={(e) => onNomeChange(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Data</label>
          <input
            type="text"
            className="form-control"
            value={pedido.data}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Valor Total</label>
          <div className="input-group">
            <span className="input-group-text">R$</span>
            <input
              type="text"
              className="form-control fw-bold"
              value={pedido.valorTotal.toFixed(2)}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}