package com.senac.nsei.application.dtos.usuario;

import com.senac.nsei.domains.entities.Usuario;
import com.senac.nsei.enums.ItemStatus;
import com.senac.nsei.enums.UsuarioRole;

public record UsuarioResponse(
        Long id,
        String login,
        UsuarioRole role,
        ItemStatus status) {
    public static UsuarioResponse fromEntity(Usuario usuario) {
        return new UsuarioResponse(
            usuario.getId(),
            usuario.getLogin(),
            usuario.getRole(),
            usuario.getStatus()
        );
    }
}
