import { useState } from "react";
import { UsuarioContext, useUsuarioContext } from "../../contexts/Usuario";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "../../components/Alert";

export default function Login() {

  const [usuarioInformado, setUsuarioInformado] = useState("");
  const [senha, setSenha] = useState("");
  const {login} = useUsuarioContext(UsuarioContext);
  const navigate = useNavigate();

  const [alert, setAlert] = useState(null);

  const fecharAlerta = () => {
    setAlert(null);
  };
  
  async function handleSubmit(e){
    e.preventDefault();

    const response = await axios.get("http://localhost:3001/usuarios?usuario="+usuarioInformado+"&senha="+senha);

    if (response.data.length > 0) {
      login({ nome: usuarioInformado, usuarioInformado, logado: true });
      navigate("/");
    } else {
      setAlert({
        message: "Usuário e/ou senha incorretos!",
        type: "danger",
      });
      setUsuarioInformado("");
      setSenha("");
    }

  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-header text-center">
            <h4>🔒 Autentique-se</h4>
          </div>
          <div className="card-body">
            {alert && (
              <Alert
                message={alert.message}
                type={alert.type}
                onClose={fecharAlerta}
              />
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="usuario" className="form-label">
                  Usuário:
                </label>
                <input
                  type="text"
                  value={usuarioInformado}
                  onChange={(e) => setUsuarioInformado(e.target.value)}
                  className="form-control"
                  id="usuario"
                  name="usuario"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="senha" className="form-label">
                  Senha:
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="form-control"
                  id="senha"
                  name="senha"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 bg-dark border-dark"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
