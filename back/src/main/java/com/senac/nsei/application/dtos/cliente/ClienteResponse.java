package com.senac.nsei.application.dtos.cliente;

public record ClienteResponse(
        String nomeCompleto,
        String login,
        String email,
        String cpf,
        String telefone,
        String numero,
        String rua,
        String bairro,
        String cidade,
        String estado,
        String cep
) {
    
}
