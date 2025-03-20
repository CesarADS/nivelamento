export default function DefaultForm({ children }) {
  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      {children}
    </form>
  );
}