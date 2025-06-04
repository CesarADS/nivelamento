package com.senac.nsei.application.dtos.vendedor;

public record VendedorRegistroRequest(
        String nomeCompleto,
        String login,
        String email,
        String senha,
        String telefone,
        String cnpj,
        String razaoSocial,
        String nomeFantasia
) {}
