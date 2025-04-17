package com.senac.nsei.application.dtos.usuario;

public record UsuarioSalvarRequest(
        Long id,
        String usuario,
        String email,
        String senha,
        Long cep,
        String rua,
        String bairro,
        String cidade,
        String estado,
        String status
) {}
