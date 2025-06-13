import { useState, useEffect } from 'react';

export const useTabela = (dados, colunasPadrao) => {
  const [dadosFiltrados, setDadosFiltrados] = useState(dados);
  const [termoBusca, setTermoBusca] = useState('');
  const [colunaBusca, setColunaBusca] = useState(colunasPadrao[0]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(8);
  console.log(dados);
  useEffect(() => {
    if (!dados) return;
    const resultados = dados?.filter(item => {
      if (!termoBusca) return true;
      if (!item[colunaBusca]) return false;
      return item[colunaBusca].toString().toLowerCase().includes(termoBusca.toLowerCase());
    });
    setDadosFiltrados(resultados);
    setPaginaAtual(1);
  }, [dados, termoBusca, colunaBusca, paginaAtual]);

  const indexUltimoItem = paginaAtual * itensPorPagina;
  const indexPrimeiroItem = indexUltimoItem - itensPorPagina;
  const itensPaginaAtual = dadosFiltrados.slice(indexPrimeiroItem, indexUltimoItem);
  const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);

  const paginar = (numeroPagina) => setPaginaAtual(numeroPagina);

  return {
    dadosFiltrados,
    itensPaginaAtual,
    totalPaginas,
    paginaAtual,
    termoBusca,
    colunaBusca,
    colunasDisponiveis: colunasPadrao,
    setTermoBusca,
    setColunaBusca,
    paginar,
  };
};