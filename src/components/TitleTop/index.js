export default function TitleTop({ children }) {
  return (
    <div className="d-flex flex-column  align-items-center mb-3">
      <h2>{children}</h2>
    </div>
  );
}