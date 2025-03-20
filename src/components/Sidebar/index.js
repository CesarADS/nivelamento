import ItemFixoMenu from "../ItemFixoMenu";
import ItemSubMenu from "../ItemSubMenu";
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

      <ul className="list-unstyled ms-3 nav flex-column mt-3">
        <ItemFixoMenu link="/">🏠 Home</ItemFixoMenu>

        <li className="nav-item">
          <ItemSubMenu id_item="submenuCadastro">📝 Cadastro</ItemSubMenu>

          <ul className="collapse list-unstyled ms-3" id="submenuCadastro">
            <ItemFixoMenu link="/cadastro-produtos">📦 Produto</ItemFixoMenu>
            <ItemFixoMenu link="/cadastro-pedidos">🛒 Pedido</ItemFixoMenu>
            <ItemFixoMenu link="/cadastro-usuario">👤 Usuário</ItemFixoMenu>
          </ul>
        </li>
      </ul>
    </div>
  );
}
