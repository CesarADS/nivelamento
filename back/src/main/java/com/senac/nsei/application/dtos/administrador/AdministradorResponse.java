package com.senac.nsei.application.dtos.administrador;

import com.senac.nsei.domains.entities.Administrador;
import com.senac.nsei.enums.ItemStatus;

public record AdministradorResponse(
        Long id,
        String login,
        String email,
        ItemStatus status
) {

    public AdministradorResponse(Administrador admin) {
        this(
            admin.getId(),
            admin.getLogin(),
            admin.getEmail(),
            admin.getStatus()
        );
    }
    
}
