package com.senac.nsei.application.dtos.produto;

import com.senac.nsei.domains.entities.Produto;

public record ProdutoResponse(
        Long id,
        String nome,
        String descricao,
        Double preco
        ) 
        {
            public ProdutoResponse(Produto produto) {
                this (
                    produto.getId(),
                    produto.getNome(),
                    produto.getDescricao(),
                    produto.getPreco()
                );
        }
    }
