package com.senac.nsei.application.dtos.administrador;

import com.senac.nsei.domains.entities.Administrador;

public record AdministradorResponse(
        String login,
        String email,
        String status
) {

    public AdministradorResponse(Administrador administrador) {
        this(
                administrador.getLogin(),
                administrador.getEmail(),
                administrador.getStatus().name()
        );
    }
    
}
