import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../service/auth.service";
import Alert from "../../components/Alert";
import { setToken } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const [usuarioInformado, setUsuarioInformado] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(null);

  const fecharAlerta = () => {
    setAlert(null);
  };
  
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(usuarioInformado, senha);

    try {
      
      const response = await authService.login({
        login: usuarioInformado,
        senha: senha
      });
      console.log(response);
      if (response.token) {
        dispatch(setToken({ usuario: response.login, token: response.token, role: response.role, id: response.idUser }));

        if (response.role === "ADMIN" || response.role === "VENDEDOR") {
          
          navigate("/home");
        } else {
          navigate("/produtos");
        }
      } else {
        setAlert({
          message: "Usuário e/ou senha incorretos!",
          type: "danger",
        });
        setUsuarioInformado("");
        setSenha("");
      }
    } catch (error) {
      setAlert({
        message: "Erro ao fazer login. Tente novamente.",
        type: "danger",
      });
    }
  
  }

  const handleCadastro = () => {
    navigate("/registro");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="col-md-5 col-lg-4">
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
          <div className="card-header bg-primary text-white">
            <div className="text-center">
              <h3 className="mb-1 mt-1">Bem-vindo</h3>
              <p className="mb-1  ">Faça login para continuar</p>
            </div>
          </div>
          <div className="card-body p-4">
            {alert && (
              <Alert
                message={alert.message}
                type={alert.type}
                onClose={fecharAlerta}
              />
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="usuario" className="form-label fw-semibold">
                  Usuário
                </label>
                <input
                  type="text"
                  value={usuarioInformado}
                  onChange={(e) => setUsuarioInformado(e.target.value)}
                  className="form-control py-2"
                  id="usuario"
                  name="usuario"
                  placeholder="Digite seu usuário"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="senha" className="form-label fw-semibold">
                  Senha
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="form-control py-2"
                  id="senha"
                  name="senha"
                  placeholder="Digite sua senha"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 mb-3 fw-semibold"
              >
                Entrar
              </button>
              
              <div className="text-center mt-3">
                <p className="mb-3 text-muted">ou</p>
                <button
                  type="button"
                  onClick={handleCadastro}
                  className="btn btn-outline-primary w-100 py-2 mb-3 fw-semibold"
                >
                  Criar nova conta
                </button>
              </div>
            </form>
            
            
          </div>
        </div>
      </div>
    </div>
  );
}