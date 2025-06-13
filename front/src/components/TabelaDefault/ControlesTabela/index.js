export const ControlesTabela = ({ 
  termoBusca, 
  setTermoBusca, 
  colunaBusca, 
  setColunaBusca, 
  colunasDisponiveis,
  totalItens,
  itensExibidos
}) => (
  <div className="row mb-3">
    <div className="col-md-6">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />
        <select
          className="form-select"
          value={colunaBusca}
          onChange={(e) => setColunaBusca(e.target.value)}
        >
          {colunasDisponiveis.map((coluna, index) => (
            <option key={index} value={coluna}>
              {coluna}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div className="col-md-6 d-flex align-items-center justify-content-end">
      <span className="text-muted">
        Mostrando {itensExibidos} de {totalItens} itens
      </span>
    </div>
  </div>
);