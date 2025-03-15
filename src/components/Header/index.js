import BotaoLogout from "../BotaoLogout";
import style from "./header.module.css";

export default function Header() {
  return (
    <header className={`${style.header} bg-dark py-3 mt-0 text-center`}>
      <p className="text-light m-0">
        📓 Atividade de nivelamento Desenvolvimento Full Stack - César
      </p>
      <nav>
      </nav>
      <BotaoLogout />
    </header>
  );
}
