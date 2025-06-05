package com.senac.nsei.application.services.interfaces;

import java.util.List;

import com.senac.nsei.application.dtos.produto.ProdutoSalvarRequest;
import com.senac.nsei.application.dtos.produto.ProdutoResponse;

public interface IProdutoService {

    ProdutoResponse criarProduto(ProdutoSalvarRequest produtoSalvarRequest, Long vendedorId);

    ProdutoResponse atualizarProduto(Long produtoId, ProdutoSalvarRequest produtoSalvarRequest);

    void inativarProduto(Long produtoId);

    List<ProdutoResponse> listarMeusProdutos(Long vendedorId);

    ProdutoResponse obterProdutoPorId(Long produtoId);

    List<ProdutoResponse> listarTodosProdutosParaCatalogo();

}