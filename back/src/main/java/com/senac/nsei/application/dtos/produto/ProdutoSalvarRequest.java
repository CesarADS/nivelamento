package com.senac.nsei.application.dtos.produto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ProdutoSalvarRequest(
        @NotBlank(message = "O nome do produto não pode ser vazio.")
        String nome,

        @NotBlank(message = "A descrição do produto não pode ser vazia.")
        String descricao,

        @NotNull(message = "O preço não pode ser nulo.")
        @Positive(message = "O preço deve ser um valor positivo.")
        Double preco) {
}