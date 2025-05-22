package com.senac.nsei.application.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senac.nsei.application.dtos.produto.ProdutoResponse;
import com.senac.nsei.application.dtos.produto.ProdutoSalvarRequest;
import com.senac.nsei.application.services.interfaces.IProdutoService;
import com.senac.nsei.domains.entities.Produto;
import com.senac.nsei.domains.repositorys.ProdutoRepository;

@Service
public class ProdutoService implements IProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Override
    public ProdutoResponse salvarProduto(ProdutoSalvarRequest produto) {
        var lProduto = new Produto(produto);
        lProduto.setStatus("Ativo");
        produtoRepository.save(lProduto);
        return new ProdutoResponse(lProduto);
    }

    @Override
    public ProdutoResponse buscarProdutoPorId(Long id) {
        return produtoRepository.findById(id).map(ProdutoResponse::new).orElse(null);
    }

    @Override
    public ProdutoResponse editarProduto(Long id, ProdutoSalvarRequest produto) {
        
        Produto produtoSearch = produtoRepository.findById(id).orElse(null);

        Produto produtoSalvar = new Produto(produto);

        produtoSalvar.setId(produtoSearch.getId());
        produtoSalvar.setStatus(produtoSearch.getStatus());

        Produto response = produtoRepository.save(produtoSalvar);

        return new ProdutoResponse(response);

    }

    @Override
    public List<ProdutoResponse> listarTodos() {
        var empresaUsuarioLogado = usuarioService.usuarioLogado().getEmpresa();
        if(empresaUsuarioLogado == null) {
            return null;
        }else {
            return produtoRepository
                    .findAll()
                    .stream()
                    .filter(produto -> "Ativo".equals(produto.getStatus())&&
                            produto.getEmpresa().getId() == empresaUsuarioLogado.getId())
                    .map(ProdutoResponse::new)
                    .toList();
        }
    }


    @Override
    public ProdutoResponse excluirProduto(Long id) {

        Produto produtoSearch = produtoRepository.findById(id).orElse(null);
        produtoSearch.setStatus("Inativo");
        Produto response = produtoRepository.save(produtoSearch);

        return new ProdutoResponse(response);

    }

}