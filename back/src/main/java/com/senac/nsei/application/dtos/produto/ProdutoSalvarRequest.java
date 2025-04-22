package com.senac.nsei.application.dtos.produto;

public record ProdutoSalvarRequest(
                String nome,
                String descricao,
                Double preco) {
}
