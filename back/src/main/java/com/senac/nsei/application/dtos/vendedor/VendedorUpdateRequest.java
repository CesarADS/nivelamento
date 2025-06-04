package com.senac.nsei.application.dtos.vendedor;

public record VendedorUpdateRequest(
        String senha,
        String telefone,
        String nomeFantasia
) {
    
}
