import { Link } from "react-router-dom";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  return (
    <div
      className={`${styles.sidebar} d-flex flex-column vh-100 bg-dark text-light`}
    >
      <div className="p-3 text-center">
        <img
          className="img-fluid md-2"
          style={{ width: "120px" }}
          src="https://www.mg.senac.br/programasenacdegratuidade/assets/img/senac_logo_branco.png"
          alt="Logo"
        />
      </div>

      <ul className="list-unstyled ms-3 nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link text-light">
            🏠︎ Home
          </Link>
        </li>

        <li className="nav-item">
          <a
            className="nav-link text-light"
            data-bs-toggle="collapse"
            href="#submenuCadastro"
            role="button"
            aria-expanded="false"
            aria-controls="submenuCadastro"
          >
            ✎ Cadastro
          </a>

          <ul className="collapse list-unstyled ms-3" id="submenuCadastro">
            <li>
              <Link to="/cadastro-produtos" className="nav-link text-light">
                📦 Produto
              </Link>
            </li>
            <li>
              <Link to="/cadastro-pedidos" className="nav-link text-light">
                🛒 Pedido
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
