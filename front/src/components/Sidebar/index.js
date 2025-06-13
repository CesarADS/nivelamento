import ItemFixoMenu from "../ItemFixoMenu";
import ItemSubMenu from "../ItemSubMenu";
import styles from "./sidebar.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({
    submenuListagem: false,
    submenuCadastro: false,
  });

  const toggleMenu = (menuId) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const userRole = useSelector((state) => state.auth?.role);

  return (
    <div
      className={`${styles.sidebar} d-flex flex-column min-vh-100 bg-dark text-light`}
    >
      <div className="p-3 text-center border-bottom border-secondary">
        <img
          className="img-fluid mb-2"
          style={{ width: "120px", transition: "transform 0.3s" }}
          src="https://www.mg.senac.br/programasenacdegratuidade/assets/img/senac_logo_branco.png"
          alt="Logo"
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <h5 className="text-white mt-2 mb-0">Sistema de Gestão</h5>
        <small className="text-muted">Painel Administrativo</small>
      </div>

      <ul className="list-unstyled nav flex-column mt-3 px-2">
        <ItemFixoMenu link="/home" className="rounded mb-1">
          <i className="bi bi-house-door-fill me-2"></i>
          Home
        </ItemFixoMenu>

        {userRole == "VENDEDOR" ? (
          <>
            <li className="nav-item mb-2">
              <div
                className={`d-flex align-items-center justify-content-between rounded px-3 py-2 ${
                  openMenus.submenuListagem
                    ? styles.menuItemActive
                    : styles.menuItem
                }`}
                data-bs-toggle="collapse"
                data-bs-target="#submenuListagem"
                onClick={() => toggleMenu("submenuListagem")}
              >
                <div>
                  <i className="bi bi-eye-fill me-2"></i>
                  Visualizar
                </div>
                <i
                  className={`bi ${
                    openMenus.submenuListagem
                      ? "bi-chevron-up"
                      : "bi-chevron-down"
                  }`}
                ></i>
              </div>
              <ul
                className={`collapse list-unstyled ms-4 mt-1 ${
                  openMenus.submenuListagem ? "show" : ""
                }`}
                id="submenuListagem"
              >
                <ItemFixoMenu
                  link="/visualizar-produtos"
                  className="rounded my-1"
                >
                  <i className="bi bi-box-seam me-2"></i>
                  Produtos
                </ItemFixoMenu>

                <ItemFixoMenu
                  link="/meus-produtos-vendidos"
                  className="rounded my-1"
                >
                  <i className="bi bi-box-seam me-2"></i>
                  Produtos Vendidos
                </ItemFixoMenu>
              </ul>
            </li>

            <li className="nav-item mb-2">
              <div
                className={`d-flex align-items-center justify-content-between rounded px-3 py-2 ${
                  openMenus.submenuCadastro
                    ? styles.menuItemActive
                    : styles.menuItem
                }`}
                data-bs-toggle="collapse"
                data-bs-target="#submenuCadastro"
                onClick={() => toggleMenu("submenuCadastro")}
              >
                <div>
                  <i className="bi bi-pencil-fill me-2"></i>
                  Cadastrar
                </div>
                <i
                  className={`bi ${
                    openMenus.submenuCadastro
                      ? "bi-chevron-up"
                      : "bi-chevron-down"
                  }`}
                ></i>
              </div>
              <ul
                className={`collapse list-unstyled ms-4 mt-1 ${
                  openMenus.submenuCadastro ? "show" : ""
                }`}
                id="submenuCadastro"
              >
                <ItemFixoMenu link="/cadastro-produto" className="rounded my-1">
                  <i className="bi bi-plus-circle me-2"></i>
                  Produto
                </ItemFixoMenu>
              </ul>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
