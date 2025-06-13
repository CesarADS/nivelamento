import { FiDollarSign, FiUser } from 'react-icons/fi';

const SummaryCard = ({ title, icon, children }) => {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title d-flex align-items-center">
          {icon}
          {title}
        </h5>
        {children}
      </div>
    </div>
  );
};

export const FinancialSummary = ({ produtosVendidos }) => {
  return (
    <SummaryCard 
      title="Resumo Financeiro" 
      icon={<FiDollarSign className="me-2 text-success" />}
    >
      <div className="d-flex justify-content-between mb-2">
        <span>Total Vendido:</span>
        <span className="fw-bold">
          {produtosVendidos.reduce((sum, item) => sum + item.subTotalItem, 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span>Itens Vendidos:</span>
        <span className="fw-bold">
          {produtosVendidos.reduce((sum, item) => sum + item.quantidadeVendida, 0)}
        </span>
      </div>
      <div className="d-flex justify-content-between">
        <span>Pedidos:</span>
        <span className="fw-bold">
          {[...new Set(produtosVendidos.map(item => item.idPedidoOriginal))].length}
        </span>
      </div>
    </SummaryCard>
  );
};

export const TopCustomers = ({ produtosVendidos }) => {
  return (
    <SummaryCard 
      title="Principais Clientes" 
      icon={<FiUser className="me-2 text-primary" />}
    >
      {produtosVendidos.length > 0 ? (
        <div className="list-group list-group-flush">
          {[...new Set(produtosVendidos.map(item => item.dadosCliente?.idCliente))]
            .filter(id => id)
            .map(idCliente => {
              const cliente = produtosVendidos.find(item => item.dadosCliente?.idCliente === idCliente)?.dadosCliente;
              const totalGasto = produtosVendidos
                .filter(item => item.dadosCliente?.idCliente === idCliente)
                .reduce((sum, item) => sum + item.subTotalItem, 0);
              
              return (
                <div key={idCliente} className="list-group-item border-0 px-0 py-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">{cliente?.nomeCliente}</h6>
                      <small className="text-muted">{cliente?.email}</small>
                    </div>
                    <span className="badge bg-light text-dark">
                      {totalGasto.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </span>
                  </div>
                </div>
              );
            })
            .slice(0, 5)}
        </div>
      ) : (
        <p className="text-muted">Nenhum cliente encontrado</p>
      )}
    </SummaryCard>
  );
};