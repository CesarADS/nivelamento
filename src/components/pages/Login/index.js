export default function Login() {
  return (
    <div className="col-md-6">
      <div className="card shadow-sm">
        <div className="card-header text-center">
          <h4>Login</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="usuario" className="form-label">
                Usuário:
              </label>
              <input
                type="text"
                className="form-control"
                id="usuario"
                name="usuario"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="senha" className="form-label">
                Senha:
              </label>
              <input
                type="password"
                className="form-control"
                id="senha"
                name="senha"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
