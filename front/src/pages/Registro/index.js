import TitleTop from "../../components/TitleTop";
import InputForm from "../../components/InputForm";
import { useState } from "react";
import axios from "axios";
import ModalBootstrap from "../../components/ModalBootstrap";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import { cadastroService } from "../../service/cadastro.service";


export default function CadastroUsuario() {
  const [exibirModal, setExibirModal] = useState(false);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [activeTab, setActiveTab] = useState("cliente"); // 'cliente' ou 'vendedor'

  // Estados comuns
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [telefone, setTelefone] = useState("");

  // Estados específicos de cliente
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");

  // Estados específicos de vendedor
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");

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


    const requestData = activeTab === 'cliente' ? {
      nomeCompleto,
      login,
      email,
      senha,
      cpf,
      telefone,
      numero,
      rua: logradouro,
      bairro,
      cidade,
      estado,
      cep
    } : {
      nomeCompleto,
      login,
      email,
      senha,
      telefone,
      cnpj,
      razaoSocial,
      nomeFantasia
    };
    
    if( activeTab === 'cliente' ) {
      cadastroService.cadastroCliente(requestData).then(res => {
        console.log(res);
        if (res) {
          setAlert({
            message: "Usuário cadastrado com sucesso! Redirecionando...",
            type: "success",
          });
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setAlert({
            message: "Erro ao cadastrar usuário. Tente novamente.",
            type: "danger",
          });
        }
      });
    } else {
      cadastroService.cadastroVendedor(requestData).then(res => {
        console.log(res);
        if (res) {
          setAlert({
            message: "Usuário cadastrado com sucesso! Redirecionando...",
            type: "success",
          });
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setAlert({
            message: "Erro ao cadastrar usuário. Tente novamente.",
            type: "danger",
          });
        }
      });
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const camposObrigatorios = activeTab === 'cliente' 
      ? [nomeCompleto, login, email, senha, confirmarSenha, cpf, cep]
      : [nomeCompleto, login, email, senha, confirmarSenha, cnpj, razaoSocial, nomeFantasia];
    
    if (camposObrigatorios.some(campo => !campo)) {
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
            texto={`Você está prestes a cadastrar um ${activeTab === 'cliente' ? 'cliente' : 'vendedor'}: ${nomeCompleto}. Deseja continuar?`}
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

            {/* Tabs */}
            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'cliente' ? 'active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('cliente')}
                >
                  Cliente
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'vendedor' ? 'active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('vendedor')}
                >
                  Vendedor
                </button>
              </li>
            </ul>

            <div className="row g-3">
              <h5 className="col-12 mb-3">Informações Pessoais</h5>
              
              <div className="col-md-6">
                <InputForm
                  label="Nome Completo *"
                  type="text"
                  id="inputNome"
                  placeholder="Nome completo"
                  value={nomeCompleto}
                  onChange={(e) => setNomeCompleto(e.target.value)}
                  required
                />
              </div>
              
              <div className="col-md-6">
                <InputForm
                  label="Login *"
                  type="text"
                  id="inputLogin"
                  placeholder="Nome de usuário"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
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
                  label="Telefone *"
                  type="text"
                  id="inputTelefone"
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
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

              {activeTab === 'cliente' ? (
                <>
                  <h5 className="col-12 mb-3 mt-4">Dados do Cliente</h5>
                  
                  <div className="col-md-6">
                    <InputForm
                      label="CPF *"
                      type="text"
                      id="inputCPF"
                      placeholder="000.000.000-00"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <InputForm
                      label="Número *"
                      type="text"
                      id="inputNumero"
                      placeholder="Número da residência"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
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
                </>
              ) : (
                <>
                  <h5 className="col-12 mb-3 mt-4">Dados do Vendedor</h5>
                  
                  <div className="col-md-6">
                    <InputForm
                      label="CNPJ *"
                      type="text"
                      id="inputCNPJ"
                      placeholder="00.000.000/0000-00"
                      value={cnpj}
                      onChange={(e) => setCnpj(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <InputForm
                      label="Razão Social *"
                      type="text"
                      id="inputRazaoSocial"
                      placeholder="Razão Social da empresa"
                      value={razaoSocial}
                      onChange={(e) => setRazaoSocial(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="col-12">
                    <InputForm
                      label="Nome Fantasia *"
                      type="text"
                      id="inputNomeFantasia"
                      placeholder="Nome Fantasia da empresa"
                      value={nomeFantasia}
                      onChange={(e) => setNomeFantasia(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              <div className="col-12 mt-4">
                <div className="d-flex justify-content-end gap-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/login")}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Cadastrar {activeTab === 'cliente' ? 'Cliente' : 'Vendedor'}
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