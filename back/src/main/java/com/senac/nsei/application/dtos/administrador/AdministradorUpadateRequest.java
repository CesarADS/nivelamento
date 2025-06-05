package com.senac.nsei.application.dtos.administrador;

import java.util.Optional;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AdministradorUpadateRequest(
    @NotBlank(message = "O e-mail é obrigatório.") @Email(message = "O formato do e-mail é inválido.")
    Optional<String> email,

    @NotBlank(message = "A senha é obrigatória.") @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres.")
    Optional<String> novaSenha
) {
    
}
