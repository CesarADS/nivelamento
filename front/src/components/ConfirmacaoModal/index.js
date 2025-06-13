import { BsXCircle, BsCheckCircle } from "react-icons/bs";

export function ConfirmacaoModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  pedido, 
  carregando 
}) {
  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar Edição</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>Você está prestes a editar o pedido <strong>{pedido.nome}</strong>.</p>
            <p>Valor total: <strong>R$ {pedido.valorTotal.toFixed(2)}</strong></p>
            <p>Deseja continuar?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              <BsXCircle className="me-1" /> Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onConfirm}
              disabled={carregando}
            >
              {carregando ? (
                <span className="spinner-border spinner-border-sm me-1"></span>
              ) : (
                <BsCheckCircle className="me-1" />
              )}
              Confirmar Edição
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show "></div>
    </div>
  );
}