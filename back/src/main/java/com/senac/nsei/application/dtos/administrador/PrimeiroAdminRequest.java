package com.senac.nsei.application.dtos.administrador;

import jakarta.validation.constraints.NotBlank;

public record PrimeiroAdminRequest(
        @NotBlank String login,
        @NotBlank String email,
        @NotBlank String senha,
        @NotBlank String setupKey
) {
}