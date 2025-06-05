package com.senac.nsei.application.dtos.usuario;

public record UsuarioUpdateRequest(
        String email,
        String senha,
        Long cep,
        String rua,
        String bairro,
        String cidade,
        String estado
) {
    
}
