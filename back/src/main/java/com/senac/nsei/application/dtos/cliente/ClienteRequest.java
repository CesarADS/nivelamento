package com.senac.nsei.application.dtos.cliente;

public record ClienteRequest(
        String nomeCompleto,
        String login,
        String email,
        String senha,
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
