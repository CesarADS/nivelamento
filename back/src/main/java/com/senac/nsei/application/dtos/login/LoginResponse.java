package com.senac.nsei.application.dtos.login;

public record LoginResponse(
        String token,
        Long idUser,
        String login,
        String role
) {
    
}
