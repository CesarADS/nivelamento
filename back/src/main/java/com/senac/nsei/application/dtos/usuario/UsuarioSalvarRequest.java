package com.senac.nsei.application.dtos.usuario;

public record UsuarioSalvarRequest(
        String usuario,
        String email,
        String senha,
        Long cep,
        String rua,
        String bairro,
        String cidade,
        String estado
) {}
