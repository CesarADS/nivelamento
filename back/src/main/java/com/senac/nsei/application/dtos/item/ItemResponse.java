package com.senac.nsei.application.dtos.item;

public record ItemResponse(
        String nome,
        Integer quantidade,
        Double preco_unitario
) {}
