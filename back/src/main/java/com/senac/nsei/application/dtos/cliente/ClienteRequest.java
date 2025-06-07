package com.senac.nsei.application.dtos.cliente;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ClienteRequest(
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

                @NotBlank(message = "O CPF é obrigatório.")
                String cpf,

                @NotBlank(message = "O telefone é obrigatório.")
                String telefone,

                @NotBlank(message = "O número do endereço é obrigatório.")
                String numero,

                @NotBlank(message = "A rua é obrigatória.")
                String rua,

                @NotBlank(message = "O bairro é obrigatório.")
                String bairro,

                @NotBlank(message = "A cidade é obrigatória.")
                String cidade,

                @NotBlank(message = "O estado é obrigatório.")
                String estado,

                @NotBlank(message = "O CEP é obrigatório.")
                String cep) {
}