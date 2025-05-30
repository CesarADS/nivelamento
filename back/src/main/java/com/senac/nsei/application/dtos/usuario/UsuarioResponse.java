package com.senac.nsei.application.dtos.usuario;

import com.senac.nsei.domains.entities.UsuarioOld;

public record UsuarioResponse(
        String usuario,
        String email,
        String cpf,
        String senha,
        Long cep,
        String rua,
        String bairro,
        String cidade,
        String estado,
        String status
) {
    public UsuarioResponse(UsuarioOld usuario) {
        this(
                usuario.getUsuario(),
                usuario.getEmail(),
                usuario.getCpf().getNumero(),
                usuario.getSenha(),
                usuario.getCep(),
                usuario.getRua(),
                usuario.getBairro(),
                usuario.getCidade(),
                usuario.getEstado(),
                usuario.getStatus()
        );
    }
}
