import TitleTop from "../../components/TitleTop";
import InputForm from "../../components/InputForm";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalBootstrap from "../../components/ModalBootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

export default function Editar_usuario() {
  const [exibirModal, setExibirModal] = useState(false);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  // pegar o id do usuario da query
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id_user = queryParams.get("id");

  const fecharAlert = () => {
    setAlert(null);
  };

  // Estado para armazenar os dados dos inputs
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  // fazer consult para pegar os dados do user
  useEffect(() => {
    axios
      .get("http://localhost:3001/usuarios/" + id_user)
      .then((response) => {
        setUsuario(response.data.usuario);
        setEmail(response.data.email);
        setSenha(response.data.senha);
        setConfirmarSenha(response.data.senha);
        setCep(response.data.cep);
        setLogradouro(response.data.rua);
        setBairro(response.data.bairro);
        setCidade(response.data.cidade);
        setEstado(response.data.estado);
      })
      .catch((error) => {
        console.log("Erro ao buscar usuário:", error);
      });
  }, []);

  const handleCepBlur = () => {
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        setLogradouro(response.data.logradouro);
        setBairro(response.data.bairro);
        setCidade(response.data.localidade);
        setEstado(response.data.uf);
      })
      .catch((error) => {
        alert("Erro ao buscar CEP:", error);
      });
  };

  function botaoConfirmar() {
    setExibirModal(false);

    if (senha === confirmarSenha) {
      axios
        .put("http://localhost:3001/usuarios/" + id_user, {
          usuario: usuario,
          email: email,
          senha: senha,
          cep: cep,
          rua: logradouro,
          bairro: bairro,
          cidade: cidade,
          estado: estado,
          status: "ativo",
        })
        .then((response) => {
          setAlert({
            message: "Usuário editado com sucesso! Redirecionando...",
            type: "success",
          });
          setTimeout(() => {
            navigate("/visualizar-usuarios");
          }, 3000);
        })
        .catch((error) => {
          alert("Erro ao cadastrar:", error);
        });
    } else {
      setAlert({
        message: "As senhas não coincidem!",
        type: "danger",
      });
      setSenha("");
      setConfirmarSenha("");
    }
  }

  // Corrigido: Apenas define o estado, sem retornar JSX
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      usuario.length > 0 &&
      email.length > 0 &&
      senha.length > 0 &&
      confirmarSenha.length > 0 &&
      cep.length > 0
    ) {
      setExibirModal(true);
    } else {
      setAlert({
        message: "Preencha todos os campos!",
        type: "warning",
      });
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-3 mb-4">
      <ModalBootstrap
        titulo="Cadastro de usuário"
        texto={`Você está prestes a editar o usuário: ${usuario}. Deseja continuar?`}
        botaoConfirmar={botaoConfirmar}
        botaoCancelar={() => setExibirModal(false)}
        exibir={exibirModal}
        setExibir={setExibirModal}
      />

      <TitleTop>✏️ Editar usuário</TitleTop>
      <form
        className="p-4 shadow rounded col-md-10 col-lg-8"
        onSubmit={handleSubmit}
      >
        <div className="form-row">
          <InputForm
            label="Usuário:"
            type="text"
            id="inputUser"
            placeholder="Digite seu nome usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <InputForm
            label="E-mail:"
            type="email"
            id="inputEmail"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputForm
            label="Senha:"
            type="password"
            id="inputPassword"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <InputForm
            label="Confirmar senha:"
            type="password"
            id="inputConfirmPassword"
            placeholder="Digite sua senha novamente"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          <InputForm
            label="CEP:"
            type="text"
            id="inputCEP"
            placeholder="Digite seu CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onBlur={handleCepBlur}
          />
          <InputForm
            label="Rua:"
            type="text"
            id="inputLogradouro"
            placeholder="Nome da rua"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
          />
          <InputForm
            label="Bairro:"
            type="text"
            id="inputBairro"
            placeholder="Nome do bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
          <InputForm
            label="Cidade:"
            type="text"
            id="inputCidade"
            placeholder="Nome da cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
          <InputForm
            label="Estado:"
            type="text"
            id="inputUF"
            placeholder="Nome do estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
          <div className="mt-4">
            {alert && (
              <Alert
                message={alert.message}
                type={alert.type}
                onClose={fecharAlert}
              />
            )}
          </div>
          <div className="row botaoCadastro">
            <button
              type="submit"
              className="btn btn-primary bg-dark border-dark mt-4 mb-2 col-md-2"
            >
              Editar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
