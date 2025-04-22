package com.senac.nsei.application.dtos.produto;

import com.senac.nsei.domains.entities.Produto;

public record ProdutoResponse(
        String nome,
        String descricao,
        Double preco,
        String status
        ) 
        {
            public ProdutoResponse(Produto produto) {
                this (
                    produto.getNome(),
                    produto.getDescricao(),
                    produto.getPreco(),
                    produto.getStatus()
                );
        }
    }
