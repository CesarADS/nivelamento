import { Link, useLocation } from "react-router-dom";

export default function ItemFixoMenu({ link, children }) {

  const location = useLocation();

  const isActive = location.pathname === link;

  return (
    <li className="nav-item">
      <Link
        to={link}
        className={`nav-link`}
        style={{ color: isActive ? "yellow" : "white" }}
      >
        {children}
      </Link>
    </li>
  );
}
