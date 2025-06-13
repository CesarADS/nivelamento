import { useEffect, useState } from 'react';
import { FiPackage } from 'react-icons/fi';
import FilterControls from '../../components/FilterControls';
import ProductsTable from '../../components/ProductsTable';
import Pagination from '../../components/Pagination';
import { FinancialSummary, TopCustomers } from '../../components/SummaryCard';
import { visualizarService } from '../../service/visualizar.service';

const MeusProdutosVendidos = () => {
  const [produtosVendidos, setProdutosVendidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('TODOS');
  const [periodo, setPeriodo] = useState('30dias');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
    
  useEffect(() => {
    async function fetchProdutosVendidos() {
      try {
        const response = await visualizarService.visualizarItensVendidos();
       
        let dadosFiltrados = [...response];
        
        if (filtroStatus !== 'TODOS') {
          dadosFiltrados = dadosFiltrados.filter(item => item.statusPedidoOriginal === filtroStatus);
        }
        
        const hoje = new Date();
        let dataLimite = new Date();
        
        if (periodo === '7dias') {
          dataLimite.setDate(hoje.getDate() - 7);
        } else if (periodo === '30dias') {
          dataLimite.setDate(hoje.getDate() - 30);
        } else if (periodo === '90dias') {
          dataLimite.setDate(hoje.getDate() - 90);
        }
        
        if (periodo !== 'TODOS') {
          dadosFiltrados = dadosFiltrados.filter(item => {
            const dataPedido = new Date(item.datePedidoOriginal);
            return dataPedido >= dataLimite;
          });
        }
        dadosFiltrados = dadosFiltrados.sort((a, b) => {
          return new Date(b.datePedidoOriginal) - new Date(a.datePedidoOriginal);
        });

        setProdutosVendidos(dadosFiltrados);
        setCurrentPage(1);
      } catch (error) {
        console.error("Erro ao buscar produtos vendidos:", error);
        setError("Erro ao carregar produtos vendidos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }

    fetchProdutosVendidos();
  }, [filtroStatus, periodo]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = produtosVendidos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(produtosVendidos.length / itemsPerPage);

  const formatarData = (dataString) => {
    const options = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dataString).toLocaleDateString('pt-BR', options);
  };

  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mx-3 my-5">
        {error}
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FiPackage className="me-2" />
          Meus Produtos Vendidos
        </h2>
        
        <FilterControls 
          periodo={periodo}
          setPeriodo={setPeriodo}
          filtroStatus={filtroStatus}
          setFiltroStatus={setFiltroStatus}
        />
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          {produtosVendidos.length === 0 ? (
            <div className="text-center py-5">
              <h5 className="text-muted">Nenhum produto vendido encontrado</h5>
              <p className="text-muted">Ajuste os filtros ou aguarde novas vendas</p>
            </div>
          ) : (
            <>
              <ProductsTable 
                currentItems={currentItems}
                formatarData={formatarData}
                formatarMoeda={formatarMoeda}
              />
              
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <FinancialSummary produtosVendidos={produtosVendidos} />
        </div>

        <div className="col-md-8">
          <TopCustomers produtosVendidos={produtosVendidos} />
        </div>
      </div>
    </div>
  );
};

export default MeusProdutosVendidos;