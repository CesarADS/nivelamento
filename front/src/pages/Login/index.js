import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../service/auth.service";
import Alert from "../../components/Alert";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/authSlice";

export default function Login() {

  const [usuarioInformado, setUsuarioInformado] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [alert, setAlert] = useState(null);

  const fecharAlerta = () => {
    setAlert(null);
  };
  
  async function handleSubmit(e){
    e.preventDefault();

    const response = await authService.login({ usuarioInformado, senha });

    if (response.length > 0) {
      dispatch(setToken({ usuario: usuarioInformado, token: response, logado: true }));
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
