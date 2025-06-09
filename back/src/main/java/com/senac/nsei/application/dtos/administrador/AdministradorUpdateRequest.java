package com.senac.nsei.application.dtos.administrador;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AdministradorUpdateRequest(
        @NotBlank(message = "O e-mail não pode ser vazio.") @Email(message = "Formato de e-mail inválido.") String email,
        @Size(min = 6, message = "A nova senha deve ter no mínimo 6 caracteres.") String novaSenha) {
}