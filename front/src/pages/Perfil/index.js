import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiMapPin, FiArrowLeft, FiEdit2, FiBriefcase, FiKey } from "react-icons/fi";
import { useSelector } from "react-redux";
import { visualizarService } from "../../service/visualizar.service";
import Alert from "../../components/Alert";

export default function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const role = useSelector(state => state.auth?.role);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const base = role === "VENDEDOR" ? "/home" : 
               role === "ADMIN" ? "/home" : 
               "/produtos";
  
  const fetchPerfil = async () => {
    try {
      let response;
      if (role === "VENDEDOR") {
        response = await visualizarService.visualizarMeuPerfilVendedor();
        setPerfil({
          nome: response.nomeCompleto,
          email: response.email,
          telefone: response.telefone,
          empresa: {
            nomeFantasia: response.nomeFantasia,
            razaoSocial: response.razaoSocial,
            cnpj: response.cnpj
          }
        });
      } else if (role === "ADMIN") {
        response = await visualizarService.visualizarMeuPerfilAdmin();
        setPerfil({
          nome: response.login,
          email: response.email,
          status: response.status,
        });
      } else {
        response = await visualizarService.visualizarMeuPerfilCliente();
        console.log(response);
        setPerfil({
          nome: response?.nomeCompleto,
          login: response?.login,
          email: response?.email,
          telefone: response?.telefone,
          documento: response?.cpf,
          endereco: {
            rua: response?.rua,
            numero: response?.numero,
            bairro: response?.bairro,
            cidade: response?.cidade,
            estado: response?.estado,
            cep: response?.cep
          }
        });
      }
    } catch (err) {
      console.error('Erro ao carregar perfil:', err);
      setError({
        message: 'Erro ao carregar dados do perfil. Tente novamente mais tarde.',
        type: 'danger'
      });
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPerfil() }, [role]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <Alert message={error.message} type={error.type} />
        <div className="d-flex justify-content-center mt-3">
          <button 
            className="btn btn-primary"
            onClick={() => fetchPerfil()}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!perfil) {
    return (
      <div className="container mt-5">
        <Alert message="Perfil não encontrado" type="danger" />
        <div className="d-flex justify-content-center mt-3">
          <button 
            className="btn btn-primary"
            onClick={() => navigate(base)}
          >
            Voltar
          </button>
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
                  Meu Perfil
                </h2>
                <button 
                  className="btn btn-sm btn-light rounded-pill"
                  onClick={() => navigate(base)}
                >
                  <FiArrowLeft className="me-1" />
                  Voltar
                </button>
              </div>
            </div>
            
            <div className="card-body p-0">
              <div className="row g-0">
                <div className="col-md-4 bg-light d-flex flex-column align-items-center py-4">
                  <div className="bg-primary bg-opacity-10 p-4 rounded-circle mb-3">
                    {role === "admin" ? <FiKey size={40} className="text-primary" /> :
                     role === "vendedor" ? <FiBriefcase size={40} className="text-primary" /> :
                     <FiUser size={40} className="text-primary" />}
                  </div>
                  <h4 className="mb-1">{perfil.nome}</h4>
                  <small className="text-muted text-capitalize">{perfil.role}</small>
                  {role === "admin" && perfil.status && (
                    <span className={`badge mt-2 ${perfil.status === "ATIVO" ? 'bg-success' : 'bg-danger'}`}>
                      {perfil.status}
                    </span>
                  )}
                </div>
                
                <div className="col-md-8 p-4">
                  <div className="mb-4">
                    <h5 className="text-primary mb-3 border-bottom pb-2">Informações Pessoais</h5>
                    
                    <div className="d-flex align-items-start mb-3">
                      <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                        <FiUser className="text-primary" size={20} />
                      </div>
                      <div>
                        <small className="text-muted d-block">Nome completo</small>
                        <p className="mb-0 fw-medium">{perfil.nome || "Não informado"}</p>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-start mb-3">
                      <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                        <FiMail className="text-primary" size={20} />
                      </div>
                      <div>
                        <small className="text-muted d-block">E-mail</small>
                        <p className="mb-0 fw-medium">{perfil.email || "Não informado"}</p>
                      </div>
                    </div>
                    
                    {perfil.telefone && (
                      <div className="d-flex align-items-start mb-3">
                        <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                          <FiPhone className="text-primary" size={20} />
                        </div>
                        <div>
                          <small className="text-muted d-block">Telefone</small>
                          <p className="mb-0 fw-medium">{perfil.telefone}</p>
                        </div>
                      </div>
                    )}
                    
                    {perfil.login && (
                      <div className="d-flex align-items-start mb-3">
                        <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                          <FiUser className="text-primary" size={20} />
                        </div>
                        <div>
                          <small className="text-muted d-block">Login</small>
                          <p className="mb-0 fw-medium">{perfil.login}</p>
                        </div>
                      </div>
                    )}
                    
                    {perfil.documento && (
                      <div className="d-flex align-items-start mb-3">
                        <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                          <FiKey className="text-primary" size={20} />
                        </div>
                        <div>
                          <small className="text-muted d-block">{role === "cliente" ? "CPF" : "CNPJ"}</small>
                          <p className="mb-0 fw-medium">{perfil.documento}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {perfil.empresa && (
                    <div className="mb-4">
                      <h5 className="text-primary mb-3 border-bottom pb-2">Informações da Empresa</h5>
                      
                      <div className="d-flex align-items-start mb-3">
                        <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                          <FiBriefcase className="text-primary" size={20} />
                        </div>
                        <div>
                          <small className="text-muted d-block">Nome Fantasia</small>
                          <p className="mb-0 fw-medium">{perfil.empresa.nomeFantasia}</p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-start mb-3">
                        <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                          <FiBriefcase className="text-primary" size={20} />
                        </div>
                        <div>
                          <small className="text-muted d-block">Razão Social</small>
                          <p className="mb-0 fw-medium">{perfil.empresa.razaoSocial}</p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-start mb-3">
                        <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                          <FiKey className="text-primary" size={20} />
                        </div>
                        <div>
                          <small className="text-muted d-block">CNPJ</small>
                          <p className="mb-0 fw-medium">{perfil.empresa.cnpj}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {perfil.endereco && (
                    <div className="mb-4">
                      <h5 className="text-primary mb-3 border-bottom pb-2">Endereço</h5>
                      
                      <div className="d-flex align-items-start">
                        <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                          <FiMapPin className="text-primary" size={20} />
                        </div>
                        <div>
                          <small className="text-muted d-block">Endereço completo</small>
                          <p className="mb-0 fw-medium">
                            {perfil.endereco.rua}, {perfil.endereco.numero}<br />
                            {perfil.endereco.bairro}<br />
                            {perfil.endereco.cidade} - {perfil.endereco.estado}<br />
                            CEP: {perfil.endereco.cep}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="card-footer bg-light d-flex justify-content-end">
              <button 
                className="btn btn-primary"
                onClick={() => navigate("/perfil/editar")}
              >
                <FiEdit2 className="me-2" />
                Editar Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}