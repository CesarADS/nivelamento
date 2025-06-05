package com.senac.nsei.application.dtos.administrador;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AdministradorRegistroRequest(
                @NotBlank(message = "O nome de usuário (login) é obrigatório.") String login,

                @NotBlank(message = "A senha é obrigatória.") @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres.") String password,

                @NotBlank(message = "O e-mail é obrigatório.") @Email(message = "O formato do e-mail é inválido.") String email) {

}
