export default function ModalBootstrap({
  titulo,
  texto,
  botaoConfirmar,
  botaoCancelar,
  exibir,
  setExibir,
}) {
  return (
    <>
      {exibir && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{titulo}</h5>
              </div>
              <div className="modal-body">
                <p>{texto}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    setExibir(false);
                    if (botaoCancelar) botaoCancelar();
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => {
                    if (botaoConfirmar) botaoConfirmar();
                    setExibir(false);
                  }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
