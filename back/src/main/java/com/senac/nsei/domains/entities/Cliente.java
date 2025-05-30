package com.senac.nsei.domains.entities;

import com.senac.nsei.domains.valueobjects.CPF;
import com.senac.nsei.enums.UsuarioRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "clientes")
public class Cliente extends Usuario {

    @Column(nullable = false)
    private String nomeCompleto;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "cpf", length = 11, nullable = false, unique = true)
    private CPF cpf;

    private String rua;
    private Integer numero;
    private String bairro;
    private String cidade;
    private String estado;
    private String cep;

    @Column(nullable = false)
    private String telefone;

    // Construtor que chama o da superclasse
    public Cliente(String login, String password, String nomeCompleto, String email, CPF cpf, String rua, Integer numero, String bairro, String cidade, String estado, String cep, String telefone) {
        super(login, password, UsuarioRole.CLIENTE);
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.cpf = cpf;
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
        this.telefone = telefone;
    }

}