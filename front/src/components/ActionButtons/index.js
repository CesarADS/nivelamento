import { BsFillPlusCircleFill, BsTrash } from "react-icons/bs";

export function ActionButtons({ 
  onLimparProdutos, 
  onSubmit, 
  carregando, 
  produtosLength 
}) {
  return (
    <div className="d-flex justify-content-between">
      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={onLimparProdutos}
        disabled={produtosLength === 0}
      >
        <BsTrash className="me-1" /> Limpar Produtos
      </button>

      <button
        type="submit"
        className="btn btn-primary px-4"
        disabled={carregando}
      >
        {carregando ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Salvando...
          </>
        ) : (
          <>
            <BsFillPlusCircleFill className="me-1" />
            Salvar Alterações
          </>
        )}
      </button>
    </div>
  );
}