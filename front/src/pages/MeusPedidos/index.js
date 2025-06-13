// pages/MeusPedidos.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alert from '../../components/Alert';
import { visualizarService } from '../../service/visualizar.service';
import StatusBadge from '../../components/StatusBadge';



export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPedidos = async () => {
      try {
        const response = await visualizarService.visualizarMeusPedidos()
        console.log(response);
        setPedidos(response);
      } catch (err) {
        console.error('Erro ao buscar pedidos:', err);
        setError({
          message: 'Erro ao carregar pedidos. Tente novamente mais tarde.',
          type: 'danger'
        });
      } finally {
        setLoading(false);
      }
  };
  useEffect(() => { fetchPedidos() }, []);

  const formatarData = (dataString) => {
    return new Date(dataString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatarValor = (valor) => {
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
      <div className="container-fluid p-4">
        <Alert message={error.message} type={error.type} />
        <button 
          className="btn btn-primary mt-3"
          onClick={() => fetchPedidos()}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">Meus Pedidos</h2>
      
      {pedidos.length === 0 && !loading ? (
        <div className="alert alert-info">
          Nenhum pedido encontrado. <Link to="/produtos">Voltar para a loja</Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Nº Pedido</th>
                <th>Data</th>
                <th>Itens</th>
                <th>Valor Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td className="fw-bold">#{pedido.id.toString().padStart(4, '0')}</td>
                  <td>{formatarData(pedido.dataPedido)}</td>
                  <td>
                    <ul className="list-unstyled mb-0">
                      {pedido.itensPedido.map((item, index) => (
                        <li key={index}>
                          {item.quantidade}x {item.nomeProduto}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="fw-bold">{formatarValor(pedido.valorTotal)}</td>
                  <td>
                    <Link 
                      to={`/meus-pedidos/${pedido.id}`} 
                      className="btn btn-sm btn-outline-primary"
                    >
                      Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}