import StatusBadge from '../StatusBadge';

const ProductsTable = ({ currentItems, formatarData, formatarMoeda }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover mb-0">
        <thead className="table-light">
          <tr>
            <th>Pedido</th>
            <th>Produto</th>
            <th>Cliente</th>
            <th className="text-end">Quantidade</th>
            <th className="text-end">Preço Unitário</th>
            <th className="text-end">Subtotal</th>
            <th>Data</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={`${item.idItemPedido}-${item.idPedidoOriginal}`}>
              <td>#{item.idPedidoOriginal.toString().padStart(6, '0')}</td>
              <td>
                <div className="d-flex align-items-center">
                  <div>
                    <h6 className="mb-0">{item.nomeProduto}</h6>
                    <small className="text-muted">ID: {item.idItemPedido}</small>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <h6 className="mb-0">{item.dadosCliente?.nomeCliente}</h6>
                  <small className="text-muted">{item.dadosCliente?.email}</small>
                </div>
              </td>
              <td className="text-end">{item.quantidadeVendida}</td>
              <td className="text-end">{formatarMoeda(item.precoUnitarioCobrado)}</td>
              <td className="text-end fw-bold">{formatarMoeda(item.subTotalItem)}</td>
              <td>{formatarData(item.datePedidoOriginal)}</td>
              <td><StatusBadge status={item.statusPedidoOriginal} /></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="table-light">
            <td colSpan="5" className="text-end fw-bold">Total:</td>
            <td className="text-end fw-bold">
              {formatarMoeda(currentItems.reduce((sum, item) => sum + item.subTotalItem, 0))}
            </td>
            <td colSpan="2"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ProductsTable;