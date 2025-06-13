import BotaoLogout from "../BotaoLogout";
import style from "./header.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsCart, BsEnvelopePaper, BsPerson } from "react-icons/bs";

export default function Header({ role }) {
  const { produtos } = useSelector(state => state.cart);
  const totalItens = produtos.reduce((total, produto) => total + produto.quantidade, 0);

  return (
    <header className={`${style.header} bg-dark py-3 px-4 d-flex justify-content-between align-items-center`}>
      {
        role === "CLIENTE" && (
          <Link to="/produtos" className="text-light position-relative link-light text-decoration-none">
              Produtos
            </Link>
        )
      }
      <div className={style.textoPrincipal}>
        <p className="text-light m-0">
          📓 Atividade de nivelamento Desenvolvimento Full Stack - César
        </p>
      </div>

      <div className="d-flex align-items-center gap-3">
        
        {role === "CLIENTE" && (
          <>
            
            <Link to="/carrinho" className="text-light position-relative">
              <BsCart className="text-light" />
              {totalItens > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItens}
                </span>
              )}
            </Link>
            <Link to="/meus-pedidos" className="btn btn-outline-light">
              <BsEnvelopePaper className="me-2" />
              Pedidos
           </Link>
  
          </>
        )}
        
        <Link to="/perfil" className="btn btn-outline-light">
              <BsPerson className="me-2" />
              Perfil
          </Link>
        <div className={style.botaoLogout}>
          <BotaoLogout />
        </div>
        
      </div>
    </header>
  );
}
