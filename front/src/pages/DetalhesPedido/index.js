// pages/DetalhesPedido.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteService} from '../../service/delete.service';
import { visualizarService } from '../../service/visualizar.service';
import { alterarService } from '../../service/alterar.service';
import StatusBadge from '../../components/StatusBadge';
import Alert from '../../components/Alert';



export default function DetalhesPedido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
   const fetchPedido = async () => {
      try {
        const response = await visualizarService.visualizarMeusPedidosbyId(id);

        setPedido(response);
        setEditData(response);
      } catch (err) {
        console.error('Erro ao buscar pedido:', err);
        setError({
          message: 'Erro ao carregar detalhes do pedido.',
          type: 'danger'
        });
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
   
    fetchPedido();
  }, [id]);

  const formatarData = (dataString) => {
    if (!dataString) return '-';
    return new Date(dataString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatarValor = (valor) => {
    return valor?.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };


  const handleEdit = async () => {
    try {
      const itensPedido = editData.itensPedido.map(item => {
        return {
          produtoId: item.idProduto,
          quantidade: item.quantidade
        }
    });
      const response = await alterarService.alterarPedido(id, {
        itensPedido: itensPedido
      });
      
      setPedido(response);
      setIsEditing(false);
      setSuccessMessage('Pedido atualizado com sucesso!');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      setError({
        message: 'Erro ao atualizar pedido. Tente novamente.',
        type: 'danger'
      });
    }
  };

  const handleCancel = async () => {
    
      try {
        await deleteService.deletePedido(id);
        setSuccessMessage('Pedido cancelado com sucesso!');
        setTimeout(() => navigate('/meus-pedidos'), 2000);
      } catch (error) {
        console.error('Erro ao cancelar pedido:', error);
        setError({
          message: 'Erro ao cancelar pedido. Tente novamente.',
          type: 'danger'
        });
      }
    
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemQuantityChange = (index, value) => {
    const newItens = [...editData.itensPedido];
    const newQuantity = parseInt(value) || 0;
    
    if (newQuantity < 1) return; 
    
    newItens[index].quantidade = newQuantity;
    newItens[index].subtotal = newItens[index].precoUnitario * newQuantity;
    
    const newTotal = newItens.reduce((sum, item) => sum + item.subtotal, 0);
    
    setEditData(prev => ({
      ...prev,
      itensPedido: newItens,
      valorTotal: newTotal
    }));
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
        <div className="d-flex gap-2 mt-3">
          <button 
            className="btn btn-primary"
            onClick={() => fetchPedido()}
          >
            Tentar novamente
          </button>
          <Link to="/meus-pedidos" className="btn btn-outline-secondary">
            Voltar para meus pedidos
          </Link>
        </div>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="container-fluid p-4">
        <Alert message="Pedido não encontrado" type="danger" />
        <Link to="/meus-pedidos" className="btn btn-primary mt-3" onClick={() => fetchPedido()}>
          Voltar para meus pedidos
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {successMessage && (
        <Alert message={successMessage} type="success" onClose={() => setSuccessMessage(null)} />
      )}
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Detalhes do Pedido #{pedido?.id?.toString().padStart(4, '0')}</h2>
        <Link to="/meus-pedidos" className="btn btn-outline-secondary">
          Voltar
        </Link>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Itens do Pedido</h5>
              {pedido.status === "ATIVO" && !isEditing && (
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Editar Pedido
                </button>
              )}
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Preço Unitário</th>
                      <th>Quantidade</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(isEditing ? editData.itensPedido : pedido.itensPedido)?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div>
                              <h6 className="mb-0">{item.nomeProduto}</h6>
                              <small className="text-muted">Cód: {item.idProduto}</small>
                            </div>
                          </div>
                        </td>
                        <td>{formatarValor(item.precoUnitario)}</td>
                        <td>
                          {isEditing ? (
                            <input
                              type="number"
                              min="1"
                              className="form-control form-control-sm"
                              style={{width: '70px'}}
                              value={item.quantidade}
                              onChange={(e) => handleItemQuantityChange(index, e.target.value)}
                            />
                          ) : (
                            item.quantidade
                          )}
                        </td>
                        <td>{formatarValor(item.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="text-end fw-bold">Total:</td>
                      <td className="fw-bold">
                        {formatarValor(isEditing ? editData.valorTotal : pedido.valorTotal)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              {isEditing && (
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancelar
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={handleEdit}
                  >
                    Salvar Alterações
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Informações do Pedido</h5>
            </div>
            <div className="card-body">
              <dl className="row">
                <dt className="col-sm-5">Data do Pedido:</dt>
                <dd className="col-sm-7">{formatarData(pedido.dataPedido)}</dd>

              </dl>

              {pedido.status === "ATIVO" && !isEditing && (
                <div className="d-grid gap-2 mt-4">
                  <button 
                    className="btn btn-danger"
                    onClick={handleCancel}
                  >
                    Cancelar Pedido
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">Informações do Cliente</h5>
            </div>
            <div className="card-body">
              <dl className="row">
                <dt className="col-sm-5">Nome:</dt>
                <dd className="col-sm-7">{pedido.cliente.nomeCliente}</dd>

                <dt className="col-sm-5">Email:</dt>
                <dd className="col-sm-7">{pedido.cliente.email}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}