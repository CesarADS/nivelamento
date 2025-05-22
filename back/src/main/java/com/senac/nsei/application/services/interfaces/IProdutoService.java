package com.senac.nsei.application.services.interfaces;

import java.util.List;

import com.senac.nsei.application.dtos.produto.ProdutoSalvarRequest;
import com.senac.nsei.application.dtos.produto.ProdutoResponse;

public interface IProdutoService {

    ProdutoResponse salvarProduto(ProdutoSalvarRequest produto);
    ProdutoResponse buscarProdutoPorId(Long id);
    ProdutoResponse editarProduto(Long id, ProdutoSalvarRequest produto);
    List<ProdutoResponse> listarTodos();
    ProdutoResponse excluirProduto(Long id);

}
