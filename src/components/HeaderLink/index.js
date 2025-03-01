//import { Link } from "react-router-dom";
import style from './headerlink.module.css';

export default function HeaderLink({url, children}) {
    return (
        <a href={url} className={style.link}>
            {children}
        </a>
    )
}