package com.senac.nsei.application.dtos.vendedor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record VendedorRegistroRequest(
                @NotBlank(message = "O nome completo é obrigatório.")
                String nomeCompleto,

                @NotBlank(message = "O login é obrigatório.")
                String login,

                @NotBlank(message = "O e-mail é obrigatório.")
                @Email(message = "O formato do e-mail é inválido.")
                String email,

                @NotBlank(message = "A senha é obrigatória.")
                @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres.")
                String senha,

                @NotBlank(message = "O telefone é obrigatório.")
                String telefone,

                @NotBlank(message = "O CNPJ é obrigatório.")
                String cnpj,

                @NotBlank(message = "A razão social é obrigatória.")
                String razaoSocial,

                @NotBlank(message = "O nome fantasia é obrigatório.")
                String nomeFantasia) {
}