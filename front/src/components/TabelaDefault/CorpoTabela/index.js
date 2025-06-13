export const CorpoTabela = ({
  itensPaginaAtual,
  colunas,
  onEditar,
  abrirModalExcluir,
}) => {
  const NUMERO_LINHAS = 8;
  const linhasFaltando = Math.max(0, NUMERO_LINHAS - itensPaginaAtual.length);

  return (
    <table className="table table-hover">
      <thead className="table-dark">
        <tr>
          <th scope="col" style={{ width: '120px' }}>Ações</th>
          {colunas.map((coluna, index) => (
            <th key={index} scope="col">
              {coluna.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {itensPaginaAtual.map((item, rowIndex) => (
          <tr key={`data-${rowIndex}`}>
            <td>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary d-flex align-items-center"
                  onClick={() => onEditar(item)}
                  title="Editar"
                >
                  <i className="bi bi-pencil-square me-1"></i>
                  <span className="d-none d-sm-inline">Editar</span>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger d-flex align-items-center"
                  onClick={() => abrirModalExcluir(item)}
                  title="Excluir"
                >
                  <i className="bi bi-trash me-1"></i>
                  <span className="d-none d-sm-inline">Excluir</span>
                </button>
              </div>
            </td>
            {colunas.map((coluna, colIndex) => (
              <td key={`data-${rowIndex}-${colIndex}`}>{item[coluna]}</td>
            ))}
          </tr>
        ))}

        {Array.from({ length: linhasFaltando }).map((_, index) => (
          <tr key={`ghost-${index}`} className="ghost-row">
            <td>&nbsp;</td>
            {colunas.map((_, colIndex) => (
              <td key={`ghost-${index}-${colIndex}`}>&nbsp;</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};