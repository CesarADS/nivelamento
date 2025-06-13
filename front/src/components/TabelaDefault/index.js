import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTabela } from '../../hooks/useTabela';
import { useExclusao } from '../../hooks/useExclusao';
import { ControlesTabela } from './ControlesTabela';
import { Paginacao } from './Paginacao';
import { CorpoTabela } from './CorpoTabela';
import ModalBootstrap from '../ModalBootstrap';
import Alert from '../Alert';

const TabelaDefault = ({ colunas, dados, setDados }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const {
    dadosFiltrados,
    itensPaginaAtual,
    totalPaginas,
    paginaAtual,
    termoBusca,
    colunaBusca,
    colunasDisponiveis,
    setTermoBusca,
    setColunaBusca,
    paginar,
  } = useTabela(dados, colunas);

  const {
    exibirModal,
    nomeItemExcluir,
    alert,
    abrirModalExcluir,
    confirmarExclusao,
    fecharAlert,
    setExibirModal
  } = useExclusao(dados, setDados, location.pathname);

  const onEditar = (item) => {
    console.log('onEditar', item);
    if (location.pathname === "/visualizar-usuarios") {
      navigate("/editar-usuario/" + item.id);
    } else if (location.pathname === "/visualizar-produtos") {
      navigate("/editar-produto/" + item.id);
    } else if (location.pathname === "/visualizar-pedidos") {
      navigate("/editar-pedido/" + item.id);
    }
  };

  return (
    <div className="container mt-4">
      <ModalBootstrap
        titulo="Confirmação de exclusão"
        texto={`Tem certeza que deseja excluir ${nomeItemExcluir}?`}
        botaoConfirmar={confirmarExclusao}
        botaoCancelar={() => setExibirModal(false)}
        exibir={exibirModal}
        setExibir={setExibirModal}
      />

      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={fecharAlert}
        />
      )}

      <ControlesTabela
        termoBusca={termoBusca}
        setTermoBusca={setTermoBusca}
        colunaBusca={colunaBusca}
        setColunaBusca={setColunaBusca}
        colunasDisponiveis={colunasDisponiveis}
        totalItens={dadosFiltrados.length}
        itensExibidos={itensPaginaAtual.length}
      />

      <CorpoTabela
        itensPaginaAtual={itensPaginaAtual}
        colunas={colunas}
        onEditar={onEditar}
        abrirModalExcluir={abrirModalExcluir}
      />

      <Paginacao
        totalPaginas={totalPaginas}
        paginaAtual={paginaAtual}
        paginar={paginar}
      />
    </div>
  );
};

export default TabelaDefault;