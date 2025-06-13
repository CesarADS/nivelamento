import { useState } from 'react';
import { deleteService } from '../service/delete.service';
import { alterarService } from '../service/alterar.service';


export const useExclusao = (dados, setDados, pathname) => {
  const [exibirModal, setExibirModal] = useState(false);
  const [itemParaExcluir, setItemParaExcluir] = useState(null);
  const [nomeItemExcluir, setNomeItemExcluir] = useState('');
  const [alert, setAlert] = useState(null);

  const abrirModalExcluir = (item) => {
    if (pathname === "/visualizar-usuarios") {
      setNomeItemExcluir(item.usuario);
    } else if (pathname === "/visualizar-produtos") {
      setNomeItemExcluir(item.nome);
    } else if (pathname === "/visualizar-pedidos") {
      setNomeItemExcluir(item.nome || `Pedido #${item.id}`);
    }
    setItemParaExcluir(item);
    setExibirModal(true);
  };

  const fecharAlert = () => setAlert(null);

  const confirmarExclusao = async () => {
    if (!itemParaExcluir) return;


    if (pathname === "/visualizar-usuarios") {
      await deleteService.deleteUsuario(itemParaExcluir.id);
    } else if (pathname === "/visualizar-produtos") {
      console.log(itemParaExcluir, 'edqwedadawdawd');
      await deleteService.deleteProduto(itemParaExcluir.id);
    } else if (pathname === "/visualizar-pedidos") {
      await deleteService.deletePedido(itemParaExcluir.id);
    }
    setAlert({ message: "Item excluído com sucesso!", type: "success" });
    setDados(dados?.filter(item => item?.id !== itemParaExcluir.id)); 
    setExibirModal(false);
  };

  return {
    exibirModal,
    nomeItemExcluir,
    alert,
    abrirModalExcluir,
    confirmarExclusao,
    fecharAlert,
    setExibirModal
  };
};