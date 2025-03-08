import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Cadastro_pedidos from "./components/pages/Cadastro_pedidos";
import Listagem_pedidos from "./components/pages/Listagem_pedidos";
import Cadastro_produtos from "./components/pages/Cadastro_produtos";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Login from "./components/pages/Login";

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />}

      <div className="d-flex">
        {!isLoginPage && <Sidebar />}

        <div className="flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<Listagem_pedidos />} />
            <Route path="/cadastro-pedidos" element={<Cadastro_pedidos />} />
            <Route path="/cadastro-produtos" element={<Cadastro_produtos />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>

      {!isLoginPage && <Footer />}
    </>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
