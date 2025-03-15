import { useState } from "react";
import { UsuarioContext, useUsuarioContext } from "../../../contexts/Usuario";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {

  const [usuarioInformado, setUsuarioInformado] = useState("");
  const [senha, setSenha] = useState("");
  const {login} = useUsuarioContext(UsuarioContext);
  const navigate = useNavigate();
  
  function handleSubmit(e){
    e.preventDefault();

    
    // Sem esperar
    /* axios.get("https://viacep.com.br/ws/01001000/json/")
    .then((response) => {
      setUsuarioInformado(response.data.logradouro);
    }); */
    

    if (usuarioInformado == "Cesar" && senha === "1") {
      login({ nome: usuarioInformado, usuarioInformado, logado: true });
      navigate("/");
    } else {
      alert("Game over!");
    }

  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-header text-center">
            <h4>Autentique-se</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="usuario" className="form-label">
                  Usuário:
                </label>
                <input
                  type="text"
                  value = {usuarioInformado}
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
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
