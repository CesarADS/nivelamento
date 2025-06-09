package com.senac.nsei.application.dtos.vendedor;

import com.senac.nsei.domains.entities.Vendedor;

public record VendedorResponse(
        Long id,
        String nomeCompleto,
        String email,
        String telefone,
        String nomeFantasia,
        String cnpj,
        String razaoSocial
) {
    public VendedorResponse(Vendedor vendedor) {
        this(
            vendedor.getId(), // ADICIONADO
            vendedor.getNomeCompleto(),
            vendedor.getEmail(),
            vendedor.getTelefone(),
            vendedor.getEmpresa().getNomeFantasia(),
            vendedor.getEmpresa().getCnpj().getNumero(),
            vendedor.getEmpresa().getRazaoSocial()
        );
    }
}
