import { Link } from "react-router-dom";

export default function ItemFixoMenu({ link, children }) {
  return (
    <li className="nav-item">
      <Link to={link} className="nav-link text-light">
        {children}
      </Link>
    </li>
  );
}
