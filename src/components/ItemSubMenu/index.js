export default function ItemSubMenu({ id_item, children }) {
  return (
    <a
      className="nav-link text-light"
      data-bs-toggle="collapse"
      href={`#${id_item}`}
      role="button"
      aria-expanded="false"
      aria-controls={id_item}
    >
      {children}
    </a>
  );
}
