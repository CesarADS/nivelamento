import TitleTop from "../../components/TitleTop";
import InputForm from "../../components/InputForm";
import { useState } from "react";
import axios from "axios";


export default function Cadastro_usuario() {

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
  
  // Estado para armazenar os dados dos inputs
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-3">
      <TitleTop>👤 Cadastro de Usuário</TitleTop>
      <form className="p-4 shadow rounded col-md-10 col-lg-8">
        <div className="form-row">
          <InputForm
            label="Usuário:"
            type="text"
            id="inputUser"
            placeholder="Digite seu nome usuário"
          />
          <InputForm
            label="E-mail:"
            type="email"
            id="inputEmail"
            placeholder="Digite seu e-mail"
          />
          <InputForm
            label="Senha:"
            type="password"
            id="inputPassword"
            placeholder="Digite sua senha"
          />
          <InputForm
            label="Confirmar senha:"
            type="password"
            id="inputConfirmPassword"
            placeholder="Digite sua senha novamente"
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
          <div className="row botaoCadastro">
            <button
              type="submit"
              className={`btn btn-primary bg-dark border-dark mt-4 mb-2 col-md-2`}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
