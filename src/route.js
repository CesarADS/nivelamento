import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Cadastro_pedidos from "./components/pages/Cadastro_pedidos";
import Listagem_pedidos from "./components/pages/Listagem_pedidos";
import Cadastro_produtos from "./components/pages/Cadastro_produtos";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Login from "./components/pages/Login";
import UsuarioLogadoProvider, { UsuarioContext } from "./contexts/Usuario";
import { useContext } from "react";

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
                </Routes>
              </PrivateRoute>
            }
          />
        </Routes>
      </UsuarioLogadoProvider>
    </BrowserRouter>
  );
}

/*{ <Header />

        <div className="d-flex">
          <Sidebar />

          <div className="flex-grow-1 p-4"></div> }*/

/*   </div>
  </div>

  <Footer /> */

