import HeaderLink from "../HeaderLink";
import style from "./header.module.css";

export default function Header() {
  return (
    <header className={`${style.header} bg-dark py-3 mt-0 text-center`}>
      <nav>
        <HeaderLink url="./">Home</HeaderLink>
        <HeaderLink url="./cadastro-produtos">Cadastro de produtos</HeaderLink>
        <HeaderLink url="./cadastro-pedidos">Cadastro de pedidos</HeaderLink>
        <HeaderLink url="./login">Login</HeaderLink>
      </nav>
    </header>
  );
}
