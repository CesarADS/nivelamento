package com.senac.nsei.application.dtos.cliente;

import com.senac.nsei.domains.entities.Cliente;

public record ClienteResponse(
        Long id,
        String nomeCompleto,
        String login,
        String email,
        String cpf,
        String telefone,
        String numero,
        String rua,
        String bairro,
        String cidade,
        String estado,
        String cep
) {
    public ClienteResponse(Cliente cliente) {
        this(
            cliente.getId(),
            cliente.getNomeCompleto(),
            cliente.getLogin(),
            cliente.getEmail(),
            cliente.getCpf().getNumero(),
            cliente.getTelefone(),
            cliente.getNumero() != null ? cliente.getNumero().toString() : "",
            cliente.getRua(),
            cliente.getBairro(),
            cliente.getCidade(),
            cliente.getEstado(),
            cliente.getCep()
        );
    }
}
