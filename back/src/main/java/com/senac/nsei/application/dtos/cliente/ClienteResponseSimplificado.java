package com.senac.nsei.application.dtos.cliente;

import com.senac.nsei.domains.entities.Cliente;

public record ClienteResponseSimplificado(
        Long idCliente,
        String nomeCliente,
        String email) {
    public ClienteResponseSimplificado(Cliente cliente) {
        this(
            cliente.getId(),
            cliente.getNomeCompleto(),
            cliente.getEmail()
        );
}
}