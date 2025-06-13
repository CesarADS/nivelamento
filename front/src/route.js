import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import CadastroPedidos from "./pages/VisualizarProdutos";
import Login from "./pages/Login";
import EditarUsuario from "./pages/EditarUsuario";
import CadastroProduto from "./pages/CadastroProduto";
import ListagemProdutos from "./pages/ListagemProdutos";
import EditarProduto from "./pages/EditarProduto";
import EditarPedido from "./pages/EditarPedido";  
import Home from "./pages/Home";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import Registro from "./pages/Registro";
import Carrinho from "./pages/Carrinho";
import Perfil from "./pages/Perfil";
import PerfilEditar from "./pages/PerfilEditar";
import MeusPedidos from "./pages/MeusPedidos";
import DetalhesPedido from "./pages/DetalhesPedido";
import MeusProdutosVendidos from "./pages/MeusProdutosVendidos";



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* Rotas privadas */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Routes>
                  {/* Rotas comuns a todos os perfis */}
                  <Route
                    path="/perfil"
                    element={
                      <RoleBasedRoute
                        roleRequired={["CLIENTE", "VENDEDOR", "ADMIN"]}
                      >
                        <DynamicLayout>
                          <Perfil />
                        </DynamicLayout>
                      </RoleBasedRoute>
                    }
                  />
                  <Route
                    path="/perfil/editar"
                    element={
                      <RoleBasedRoute
                        roleRequired={["CLIENTE", "VENDEDOR", "ADMIN"]}
                      >
                        <DynamicLayout>
                          <PerfilEditar />
                        </DynamicLayout>
                      </RoleBasedRoute>
                    }
                  />

                  {/* Rotas exclusivas para comprador */}
                  <Route
                    path="/carrinho"
                    element={
                      <RoleBasedRoute roleRequired={["CLIENTE"]}>
                        <DynamicLayout>
                          <Carrinho />
                        </DynamicLayout>
                      </RoleBasedRoute>
                    }
                  />

                  <Route
                    path="/meus-pedidos"
                    element={
                      <RoleBasedRoute roleRequired={["CLIENTE"]}>
                        <DynamicLayout>
                          <MeusPedidos />
                        </DynamicLayout>
                      </RoleBasedRoute>
                    }
                  />

                  <Route
                    path="/meus-pedidos/:id"
                    element={
                      <RoleBasedRoute roleRequired={["CLIENTE"]}>
                        <DynamicLayout>
                          <DetalhesPedido />
                        </DynamicLayout>
                      </RoleBasedRoute>
                    }
                  />
                  <Route
                    path="/produtos"
                    element={
                      <RoleBasedRoute roleRequired={["CLIENTE"]}>
                        <DynamicLayout>
                          <CadastroPedidos />
                        </DynamicLayout>
                      </RoleBasedRoute>
                    }
                  />

                  {/* Rotas exclusivas para vendedor */}
                  <Route
                    path="/home"
                    element={
                      <RoleBasedRoute roleRequired={["VENDEDOR", "ADMIN"]}>
                        <DynamicLayout>
                          <Home />
                        </DynamicLayout>
                      </RoleBasedRoute>
                    }
                  />

                  <Route
                    path="/cadastro-produto"
                    element={
                      <RoleBasedRoute roleRequired={["VENDEDOR"]}>
                        <DynamicLayout>
                          <CadastroProduto />
                        </DynamicLayout>
                      </RoleBasedRoute>
                    }
                  />

                 

                  <Route
                    path="/visualizar-produtos"
                    element={
                      <RoleBasedRoute roleRequired={["VENDEDOR"]}>
                        <DynamicLayout>
                          <ListagemProdutos />
                        </DynamicLayout>
                      </RoleBasedRoute>
                    }
                  />

                

                  <Route
                    path="/editar-usuario/:id"
                    element={
                      <RoleBasedRoute roleRequired={["VENDEDOR"]}>
                        <DynamicLayout>
                          <EditarUsuario />
                        </DynamicLayout>
                      </RoleBasedRoute>
                    }
                  />

                  <Route
                    path="/editar-pedido/:id"
                    element={
                      <RoleBasedRoute roleRequired={["VENDEDOR"]}>
                        <DynamicLayout>
                          <EditarPedido />
                        </DynamicLayout>
                      </RoleBasedRoute>
                    }
                  />

                  <Route
                    path="/editar-produto/:id"
                    element={
                      <RoleBasedRoute roleRequired={["VENDEDOR"]}>
                        <DynamicLayout>
                          <EditarProduto />
                        </DynamicLayout>
                      </RoleBasedRoute>
                    }
                  />
                 <Route
                    path="/meus-produtos-vendidos/"
                    element={
                      <RoleBasedRoute roleRequired={["VENDEDOR"]}>
                        <DynamicLayout>
                          <MeusProdutosVendidos />
                        </DynamicLayout>
                      </RoleBasedRoute>
                    }
                  />
                  

                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
              </PrivateRoute>
            }
          />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}
function PrivateRoute({ children }) {
  const token = useSelector(state => state.auth.token);
  console.log(token, "token");
  return token ? children : <Navigate to="/login" />;
}

function RoleBasedRoute({ roleRequired, children }) {
  const userRole = useSelector(state => state.auth?.role);
  console.log(userRole, "userRole");
  if (roleRequired.includes(userRole)) {
    return children;
  }
  return <Navigate to="/login" />;
}

function DynamicLayout({ children }) {
  const userRole = useSelector(state => state.auth?.role);
  const showSidebar = ["VENDEDOR", "ADMIN"].includes(userRole);

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <Header role={userRole} />
      <div className="d-flex flex-grow-1" style={{ overflow: "hidden" }}>
        {showSidebar && <Sidebar role={userRole} />}
        <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
