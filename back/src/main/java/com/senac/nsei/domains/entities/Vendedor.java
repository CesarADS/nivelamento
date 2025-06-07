package com.senac.nsei.domains.entities;

import com.senac.nsei.enums.UsuarioRole;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "vendedores")
public class Vendedor extends Usuario {

    @Column(nullable = false)
    private String nomeCompleto;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String telefone;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true) // ADICIONE AQUI
    @JoinColumn(name = "empresa_id", nullable = false, unique = true)
    private Empresa empresa;

    // Construtor que chama o da superclasse
    public Vendedor(String login, String password, String nomeCompleto, String email, String telefone, Empresa empresa) {
        super(login, password, UsuarioRole.VENDEDOR);
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.telefone = telefone;
        this.empresa = empresa;
    }

}