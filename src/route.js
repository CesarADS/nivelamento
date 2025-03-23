import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import UsuarioLogadoProvider, { UsuarioContext } from "./contexts/Usuario";
import { useContext } from "react";
import Listagem_pedidos from "./pages/Listagem_pedidos";
import Cadastro_pedidos from "./pages/Cadastro_pedidos";
import Cadastro_produtos from "./pages/Cadastro_produtos";
import Cadastro_usuario from "./pages/Cadastro_usuario";
import Login from "./pages/Login";
import Listagem_usuarios from "./pages/Listagem_usuarios";

function PrivateRoute({children}) {

  const {usuario} = useContext(UsuarioContext);

  if (!usuario.logado) {
    return <Navigate to = "/login" replace/>;
  }

  return children;

}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <UsuarioLogadoProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                <Routes>
                  <Route path="/" element={<Listagem_pedidos />} />
                  <Route
                    path="/cadastro-pedidos"
                    element={<Cadastro_pedidos />}
                  />
                  <Route
                    path="/cadastro-produtos"
                    element={<Cadastro_produtos />}
                  />
                  <Route path="/cadastro-usuario" element={<Cadastro_usuario />} />
                  <Route path="/visualizar-usuarios" element={<Listagem_usuarios />} />
                </Routes>
                </ProtectedLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </UsuarioLogadoProvider>
    </BrowserRouter>
  );

function ProtectedLayout({ children }) {
  return (
    <>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-4">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
}
