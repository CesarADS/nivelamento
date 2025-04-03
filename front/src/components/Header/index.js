import BotaoLogout from "../BotaoLogout";
import style from "./header.module.css";

export default function Header() {
  return (
    <header className={`${style.header} bg-dark py-3 mt-0 text-center`}>
      <div className={style.textoPrincipal}>
        <p className="text-light m-0">
          📓 Atividade de nivelamento Desenvolvimento Full Stack - César
        </p>
      </div>
      <nav></nav>
      <div className={style.botaoLogout}>
        <BotaoLogout />
      </div>
    </header>
  );
}
