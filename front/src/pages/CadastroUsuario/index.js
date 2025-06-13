import TitleTop from "../../components/TitleTop";
import InputForm from "../../components/InputForm";
import { useState } from "react";
import axios from "axios";
import ModalBootstrap from "../../components/ModalBootstrap";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

export default function CadastroUsuario() {
  const [exibirModal, setExibirModal] = useState(false);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  // Estados do formulário
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const handleCepBlur = () => {
    if (cep.length === 8) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          setLogradouro(response.data.logradouro || "");
          setBairro(response.data.bairro || "");
          setCidade(response.data.localidade || "");
          setEstado(response.data.uf || "");
        })
        .catch((error) => {
          console.log("Erro ao buscar CEP:", error);
        });
    }
  };

  const botaoConfirmar = () => {
    setExibirModal(false);
    
    if (senha !== confirmarSenha) {
      setAlert({ message: "As senhas não coincidem!", type: "danger" });
      setSenha("");
      setConfirmarSenha("");
      return;
    }

    axios.post("http://localhost:3001/usuarios", {
      usuario,
      email,
      senha,
      cep,
      rua: logradouro,
      bairro,
      cidade,
      estado,
      status: "ativo"
    })
    .then(() => {
      setAlert({
        message: "Usuário cadastrado com sucesso! Redirecionando...",
        type: "success",
      });
      setTimeout(() => navigate("/visualizar-usuarios"), 3000);
    })
    .catch((error) => {
      setAlert({
        message: "Erro ao cadastrar usuário. Tente novamente.",
        type: "danger",
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!usuario || !email || !senha || !confirmarSenha || !cep) {
      setAlert({ message: "Preencha todos os campos obrigatórios!", type: "warning" });
      return;
    }
    
    setExibirModal(true);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <TitleTop>👤 Cadastro de Usuário</TitleTop>
          
          <ModalBootstrap
            titulo="Confirmação de Cadastro"
            texto={`Você está prestes a cadastrar o usuário: ${usuario}. Deseja continuar?`}
            botaoConfirmar={botaoConfirmar}
            botaoCancelar={() => setExibirModal(false)}
            exibir={exibirModal}
            setExibir={setExibirModal}
          />

          <form onSubmit={handleSubmit} className="card shadow-sm p-4">
            {alert && (
              <div className="mb-3">
                <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
              </div>
            )}

            <div className="row g-3">
              <h5 className="col-12 mb-3">Informações Pessoais</h5>
              
              <div className="col-md-6">
                <InputForm
                  label="Usuário *"
                  type="text"
                  id="inputUser"
                  placeholder="Nome de usuário"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                />
              </div>
              
              <div className="col-md-6">
                <InputForm
                  label="E-mail *"
                  type="email"
                  id="inputEmail"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="col-md-6">
                <InputForm
                  label="Senha *"
                  type="password"
                  id="inputPassword"
                  placeholder="Crie uma senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              
              <div className="col-md-6">
                <InputForm
                  label="Confirmar Senha *"
                  type="password"
                  id="inputConfirmPassword"
                  placeholder="Repita a senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                />
              </div>

              <h5 className="col-12 mb-3 mt-4">Endereço</h5>
              
              <div className="col-md-4">
                <InputForm
                  label="CEP *"
                  type="text"
                  id="inputCEP"
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
                  onBlur={handleCepBlur}
                  maxLength={8}
                  required
                />
              </div>
              
              <div className="col-md-8">
                <InputForm
                  label="Logradouro"
                  type="text"
                  id="inputLogradouro"
                  placeholder="Rua/Avenida"
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)}
                />
              </div>
              
              <div className="col-md-6">
                <InputForm
                  label="Bairro"
                  type="text"
                  id="inputBairro"
                  placeholder="Nome do bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
              </div>
              
              <div className="col-md-4">
                <InputForm
                  label="Cidade"
                  type="text"
                  id="inputCidade"
                  placeholder="Nome da cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />
              </div>
              
              <div className="col-md-2">
                <InputForm
                  label="UF"
                  type="text"
                  id="inputUF"
                  placeholder="Estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  maxLength={2}
                />
              </div>

              <div className="col-12 mt-4">
                <div className="d-flex justify-content-end gap-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/visualizar-usuarios")}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Cadastrar Usuário
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}