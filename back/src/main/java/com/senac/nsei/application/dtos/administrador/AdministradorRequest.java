package com.senac.nsei.application.dtos.administrador;

public record AdministradorRequest (
        String login,
        String password,
        String email
) {
    
}
