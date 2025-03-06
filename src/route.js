import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro_pedidos from "./components/pages/Cadastro_pedidos";
import Listagem_pedidos from "./components/pages/Listagem_pedidos";
import Cadastro_produtos from "./components/pages/Cadastro_produtos";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function AppRoutes() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Listagem_pedidos />} />
        <Route path="/cadastro-pedidos" element={<Cadastro_pedidos />} />
        <Route path="/cadastro-produtos" element={<Cadastro_produtos />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
