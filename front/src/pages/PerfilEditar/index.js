import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiMapPin, FiArrowLeft, FiSave, FiLock, FiHome, FiBriefcase } from "react-icons/fi";
import { useSelector } from "react-redux";
import { visualizarService } from "../../service/visualizar.service";
import Alert from "../../components/Alert";
import { alterarService } from "../../service/alterar.service";
export default function PerfilEditar() {
  const role = useSelector(state => state.auth?.role);
  const [formData, setFormData] = useState({
    senha: "",
    novaSenha: "",
    confirmarSenha: "",
    telefone: "",
    email: "",
    numero: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    nomeFantasia: ""
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const fetchPerfil = async () => {
              console.log("role", role);

      try {
        if (role === "ADMIN") {
          const response = await visualizarService.visualizarMeuPerfilAdmin();
          setFormData({
            email: response?.email,
            novaSenha: "",
            confirmarSenha: ""
          });
        } else if (role === "VENDEDOR") {
          const response = await visualizarService.visualizarMeuPerfilVendedor();
          setFormData({
            telefone: response?.telefone,
            nomeFantasia: response?.nomeFantasia,
            senha: "",
            confirmarSenha: ""
          });
        } else {
          console.log("roldwadwde", role);
          const response = await visualizarService.visualizarMeuPerfilCliente();
          setFormData({
            telefone: response?.telefone,
            numero: response?.numero,
            rua: response?.rua,
            bairro: response?.bairro,
            cidade: response?.cidade,
            estado: response?.estado,
            cep: response?.cep,
            senha: "",
            confirmarSenha: ""
          });
        }
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
        setError('Erro ao carregar dados do perfil. Tente novamente.');
      } finally {
        setLoading(false);
        console.log(formData);
      }
    };
  const fetPutPerfil = async (dataToSend) => {
    try {
      if (role === "ADMIN") {
        const response = await alterarService.alterarPerfilAdmin(dataToSend);
        setFormData({
          email: response?.email,
          novaSenha: "",
          confirmarSenha: ""
        });
      } else if (role === "VENDEDOR") {
        const response = await alterarService.alterarPerfilVendedor(dataToSend);
        setFormData({
          telefone: response?.telefone,
          nomeFantasia: response?.nomeFantasia,
          senha: "",
          confirmarSenha: ""
        });
      } else {
        const response = await alterarService.alterarPerfilCliente(dataToSend);
        setFormData({
          telefone: response?.telefone,
          numero: response?.numero,
          rua: response?.rua,
          bairro: response?.bairro,
          cidade: response?.cidade,
          estado: response?.estado,
          cep: response?.cep,
          senha: "",
          confirmarSenha: ""
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    } finally {
      setSaving(false);
    } 
  };

  useEffect(() => {
    fetchPerfil();
  }, [loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    // Validação básica
    if ((role === "ADMIN" || role === "VENDEDOR" || role === "CLIENTE") &&
        formData.novaSenha && formData.novaSenha !== formData.confirmarSenha) {
      setError("As senhas não coincidem!");
      setSaving(false);
      return;
    }

    try {
      let dataToSend = {};
      if (role === "ADMIN") {
        dataToSend = {
          email: formData.email,
          novaSenha: formData.novaSenha
        };
      } else if (role === "VENDEDOR") {
        dataToSend = {
          telefone: formData.telefone,
          nomeFantasia: formData.nomeFantasia,
          senha: formData.senha
        };
      } else {
        dataToSend = {
          telefone: formData.telefone,
          numero: formData.numero,
          rua: formData.rua,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado,
          cep: formData.cep,
          senha: formData.senha
        };
      }

      await fetPutPerfil(dataToSend);
      
      setSuccess("Perfil atualizado com sucesso!");
      setTimeout(() => navigate("/perfil"), 1500);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      setError("Erro ao atualizar perfil. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg overflow-hidden">
            <div className="card-header bg-gradient-primary py-4 text-black">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="h4 mb-0">
                  <FiUser className="me-2" />
                  Editar Perfil - {role === "admin" ? "Administrador" : role === "vendedor" ? "Vendedor" : "Cliente"}
                </h2>
                <button 
                  className="btn btn-sm btn-light rounded-pill"
                  onClick={() => navigate("/perfil")}
                >
                  <FiArrowLeft className="me-1" />
                  Voltar
                </button>
              </div>
            </div>
            
            <div className="card-body p-4">
              {error && <Alert message={error} type="danger" />}
              {success && <Alert message={success} type="success" />}
              
              <form onSubmit={handleSubmit}>
                {/* Campos comuns a todos os tipos de usuário */}
                {(role === "VENDEDOR" || role === "CLIENTE") && (
                  <div className="mb-4">
                    <h5 className="text-primary mb-3 border-bottom pb-2">Alterar Senha</h5>
                    
                    <div className="mb-3">
                      <label htmlFor="senha" className="form-label text-muted small">Nova Senha</label>
                      <div className="input-group">
                        <span className="input-group-text bg-primary bg-opacity-10 text-primary">
                          <FiLock />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="senha"
                          name="senha"
                          value={formData.senha}
                          onChange={handleChange}
                          placeholder="Deixe em branco para manter a atual"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="confirmarSenha" className="form-label text-muted small">Confirmar Nova Senha</label>
                      <div className="input-group">
                        <span className="input-group-text bg-primary bg-opacity-10 text-primary">
                          <FiLock />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmarSenha"
                          name="confirmarSenha"
                          value={formData.confirmarSenha}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {role === "ADMIN" && (
                  <div className="mb-4">
                    <h5 className="text-primary mb-3 border-bottom pb-2">Informações do Administrador</h5>
                    
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label text-muted small">E-mail</label>
                      <div className="input-group">
                        <span className="input-group-text bg-primary bg-opacity-10 text-primary">
                          <FiMail />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="novaSenha" className="form-label text-muted small">Nova Senha</label>
                      <div className="input-group">
                        <span className="input-group-text bg-primary bg-opacity-10 text-primary">
                          <FiLock />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="novaSenha"
                          name="novaSenha"
                          value={formData.novaSenha}
                          onChange={handleChange}
                          placeholder="Deixe em branco para manter a atual"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="confirmarSenha" className="form-label text-muted small">Confirmar Nova Senha</label>
                      <div className="input-group">
                        <span className="input-group-text bg-primary bg-opacity-10 text-primary">
                          <FiLock />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmarSenha"
                          name="confirmarSenha"
                          value={formData.confirmarSenha}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {role === "VENDEDOR" && (
                  <div className="mb-4">
                    <h5 className="text-primary mb-3 border-bottom pb-2">Informações do Vendedor</h5>
                    
                    <div className="mb-3">
                      <label htmlFor="telefone" className="form-label text-muted small">Telefone</label>
                      <div className="input-group">
                        <span className="input-group-text bg-primary bg-opacity-10 text-primary">
                          <FiPhone />
                        </span>
                        <input
                          type="tel"
                          className="form-control"
                          id="telefone"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleChange}
                          required
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="nomeFantasia" className="form-label text-muted small">Nome Fantasia</label>
                      <div className="input-group">
                        <span className="input-group-text bg-primary bg-opacity-10 text-primary">
                          <FiBriefcase />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="nomeFantasia"
                          name="nomeFantasia"
                          value={formData.nomeFantasia}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {role === "CLIENTE" && (
                  <div className="mb-4">
                    <h5 className="text-primary mb-3 border-bottom pb-2">Informações Pessoais</h5>
                    
                    <div className="mb-3">
                      <label htmlFor="telefone" className="form-label text-muted small">Telefone</label>
                      <div className="input-group">
                        <span className="input-group-text bg-primary bg-opacity-10 text-primary">
                          <FiPhone />
                        </span>
                        <input
                          type="tel"
                          className="form-control"
                          id="telefone"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleChange}
                          required
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>
                    
                    <h5 className="text-primary mb-3 border-bottom pb-2 mt-4">Endereço</h5>
                    
                    <div className="row g-2 mb-3">
                      <div className="col-md-8">
                        <label htmlFor="rua" className="form-label text-muted small">Rua</label>
                        <div className="input-group">
                          <span className="input-group-text bg-primary bg-opacity-10 text-primary">
                            <FiMapPin />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="rua"
                            name="rua"
                            value={formData.rua}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="numero" className="form-label text-muted small">Número</label>
                        <input
                          type="text"
                          className="form-control"
                          id="numero"
                          name="numero"
                          value={formData.numero}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="bairro" className="form-label text-muted small">Bairro</label>
                      <input
                        type="text"
                        className="form-control"
                        id="bairro"
                        name="bairro"
                        value={formData.bairro}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="row g-2">
                      <div className="col-md-6">
                        <label htmlFor="cidade" className="form-label text-muted small">Cidade</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cidade"
                          name="cidade"
                          value={formData.cidade}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="estado" className="form-label text-muted small">Estado</label>
                        <input
                          type="text"
                          className="form-control"
                          id="estado"
                          name="estado"
                          value={formData.estado}
                          onChange={handleChange}
                          maxLength="2"
                          placeholder="UF"
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="cep" className="form-label text-muted small">CEP</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cep"
                          name="cep"
                          value={formData.cep}
                          onChange={handleChange}
                          placeholder="00000-000"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="d-flex justify-content-end border-top pt-4">
                  <button 
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Salvando...
                      </>
                    ) : (
                      <>
                        <FiSave className="me-2" />
                        Salvar Alterações
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}