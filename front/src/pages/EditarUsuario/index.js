import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TitleTop from "../../components/TitleTop";
import InputForm from "../../components/InputForm";
import ModalBootstrap from "../../components/ModalBootstrap";
import Alert from "../../components/Alert";

export default function EditarUsuario() {
  const [exibirModal, setExibirModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  
  const { id } = useParams();
  const id_user = id;

  const [formData, setFormData] = useState({
    usuario: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: ""
  });

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/usuarios/${id_user}`);
        setFormData({
          usuario: response.data.usuario,
          email: response.data.email,
          senha: response.data.senha,
          confirmarSenha: response.data.senha,
          cep: response.data.cep,
          logradouro: response.data.rua,
          bairro: response.data.bairro,
          cidade: response.data.cidade,
          estado: response.data.estado
        });
      } catch (error) {
        setAlert({
          message: "Erro ao carregar usuário. Tente novamente mais tarde.",
          type: "danger",
        });
        console.error("Erro ao buscar usuário:", error);
      } finally {
      }
    };

    fetchUsuario();
  }, [id_user]);

  const fecharAlert = () => setAlert(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCepBlur = async () => {
    if (formData.cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${formData.cep}/json/`);
        setFormData(prev => ({
          ...prev,
          logradouro: response.data.logradouro,
          bairro: response.data.bairro,
          cidade: response.data.localidade,
          estado: response.data.uf
        }));
      } catch (error) {
        setAlert({
          message: "CEP não encontrado. Verifique e tente novamente.",
          type: "warning",
        });
        console.error("Erro ao buscar CEP:", error);
      } finally {
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.usuario || !formData.email || !formData.senha || !formData.confirmarSenha || !formData.cep) {
      return setAlert({
        message: "Preencha todos os campos obrigatórios!",
        type: "warning",
      });
    }

    if (formData.senha !== formData.confirmarSenha) {
      return setAlert({
        message: "As senhas não coincidem!",
        type: "danger",
      });
    }

    setExibirModal(true);
  };

  const confirmarEdicao = async () => {
    setExibirModal(false);

    try {
      await axios.put(`http://localhost:3001/usuarios/${id_user}`, {
        id: id_user,
        usuario: formData.usuario,
        email: formData.email,
        senha: formData.senha,
        cep: formData.cep,
        rua: formData.logradouro,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
        status: "ativo"
      });

      setAlert({
        message: "Usuário editado com sucesso! Redirecionando...",
        type: "success",
      });

      setTimeout(() => navigate("/visualizar-usuarios"), 2000);
    } catch (error) {
      setAlert({
        message: "Erro ao editar usuário. Tente novamente.",
        type: "danger",
      });
      console.error("Erro ao editar usuário:", error);
    } finally {
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <TitleTop>
            <i className="bi bi-person-gear me-2"></i>
            Editar Usuário: {formData.usuario}
          </TitleTop>

          {alert && (
            <Alert 
              message={alert.message} 
              type={alert.type} 
              onClose={fecharAlert} 
              className="mb-4"
            />
          )}

          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <InputForm
                      label="Usuário *"
                      type="text"
                      id="usuario"
                      placeholder="Digite o nome de usuário"
                      value={formData.usuario}
                      onChange={handleInputChange}
                      icon="bi bi-person-fill"
                    />
                  </div>
                  
                  <div className="col-md-6 mb-4">
                    <InputForm
                      label="E-mail *"
                      type="email"
                      id="email"
                      placeholder="Digite o e-mail"
                      value={formData.email}
                      onChange={handleInputChange}
                      icon="bi bi-envelope-fill"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <InputForm
                      label="Senha *"
                      type="password"
                      id="senha"
                      placeholder="Digite a senha"
                      value={formData.senha}
                      onChange={handleInputChange}
                      icon="bi bi-lock-fill"
                    />
                  </div>
                  
                  <div className="col-md-6 mb-4">
                    <InputForm
                      label="Confirmar Senha *"
                      type="password"
                      id="confirmarSenha"
                      placeholder="Confirme a senha"
                      value={formData.confirmarSenha}
                      onChange={handleInputChange}
                      icon="bi bi-lock-fill"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3 mb-4">
                    <InputForm
                      label="CEP *"
                      type="text"
                      id="cep"
                      placeholder="00000-000"
                      value={formData.cep}
                      onChange={handleInputChange}
                      onBlur={handleCepBlur}
                      icon="bi bi-postcard-fill"
                      maxLength="8"
                    />
                  </div>
                  
                  <div className="col-md-9 mb-4">
                    <InputForm
                      label="Logradouro"
                      type="text"
                      id="logradouro"
                      placeholder="Rua/Avenida"
                      value={formData.logradouro}
                      onChange={handleInputChange}
                      icon="bi bi-signpost-fill"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <InputForm
                      label="Bairro"
                      type="text"
                      id="bairro"
                      placeholder="Nome do bairro"
                      value={formData.bairro}
                      onChange={handleInputChange}
                      icon="bi bi-pin-map-fill"
                    />
                  </div>
                  
                  <div className="col-md-4 mb-4">
                    <InputForm
                      label="Cidade"
                      type="text"
                      id="cidade"
                      placeholder="Nome da cidade"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      icon="bi bi-building"
                    />
                  </div>
                  
                  <div className="col-md-2 mb-4">
                    <InputForm
                      label="Estado"
                      type="text"
                      id="estado"
                      placeholder="UF"
                      value={formData.estado}
                      onChange={handleInputChange}
                      icon="bi bi-geo-alt-fill"
                      maxLength="2"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 pt-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/visualizar-usuarios")}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ModalBootstrap
        titulo="Confirmar Edição"
        texto={`Você está prestes a editar o usuário "${formData.usuario}". Deseja continuar?`}
        botaoConfirmar={confirmarEdicao}
        botaoCancelar={() => setExibirModal(false)}
        exibir={exibirModal}
        setExibir={setExibirModal}
        confirmarTexto="Confirmar Edição"
        cancelarTexto="Cancelar"
      />
    </div>
  );
}