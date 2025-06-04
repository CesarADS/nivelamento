package com.senac.nsei.application.dtos.cliente;

public record ClienteUpdateRequest(
        String senha,
        String telefone,
        String numero,
        String rua,
        String bairro,
        String cidade,
        String estado,
        String cep
) {
    
}
