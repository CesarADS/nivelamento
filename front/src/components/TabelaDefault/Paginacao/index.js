export const Paginacao = ({ totalPaginas, paginaAtual, paginar }) => {
  if (totalPaginas <= 1) return null;

  // Configurações de visualização
  const maxBotoesVisiveis = 5; // Número máximo de botões de página visíveis
  const metadeVisiveis = Math.floor(maxBotoesVisiveis / 2);
  
  // Calcula o intervalo de páginas a serem mostradas
  let inicio = Math.max(1, paginaAtual - metadeVisiveis);
  let fim = Math.min(totalPaginas, inicio + maxBotoesVisiveis - 1);
  
  // Ajusta se estiver no final
  if (fim - inicio + 1 < maxBotoesVisiveis) {
    inicio = Math.max(1, fim - maxBotoesVisiveis + 1);
  }

  const paginas = [];
  
  // Sempre mostra a primeira página
  if (inicio > 1) {
    paginas.push(1);
    if (inicio > 2) {
      paginas.push('...');
    }
  }
  
  // Páginas do meio
  for (let i = inicio; i <= fim; i++) {
    paginas.push(i);
  }
  
  // Sempre mostra a última página
  if (fim < totalPaginas) {
    if (fim < totalPaginas - 1) {
      paginas.push('...');
    }
    paginas.push(totalPaginas);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center mb-0">
        <li className={`page-item ${paginaAtual === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link px-3"
            onClick={() => paginar(paginaAtual - 1)}
            disabled={paginaAtual === 1}
            aria-label="Anterior"
          >
            &laquo;
          </button>
        </li>
        
        {paginas.map((numero, index) => (
          <li 
            key={numero === '...' ? `dots-${index}` : numero}
            className={`page-item ${paginaAtual === numero ? 'active' : ''} ${numero === '...' ? 'disabled' : ''}`}
          >
            {numero === '...' ? (
              <span className="page-link px-3">...</span>
            ) : (
              <button
                className="page-link px-3"
                onClick={() => paginar(numero)}
              >
                {numero}
              </button>
            )}
          </li>
        ))}
        
        <li className={`page-item ${paginaAtual === totalPaginas ? 'disabled' : ''}`}>
          <button
            className="page-link px-3"
            onClick={() => paginar(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
            aria-label="Próxima"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};