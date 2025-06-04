package com.senac.nsei.application.dtos.vendedor;

public record VendedorResponse(
        String nomeCompleto,
        String email,
        String telefone,
        String nomeFantasia,
        String cnpj,
        String razaoSocial
) {
    
}
