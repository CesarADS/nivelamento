package com.senac.nsei.domains.entities;

import com.senac.nsei.application.dtos.usuario.UsuarioSalvarRequest;
import com.senac.nsei.domains.valueobjects.CPF;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "usuario")
public class Usuario {

    public Usuario(UsuarioSalvarRequest usuario) {
        this.usuario = usuario.usuario();
        this.email = usuario.email();
        this.cpf = new CPF(usuario.cpf());
        this.senha = usuario.senha();
        this.cep = usuario.cep();
        this.rua = usuario.rua();
        this.bairro = usuario.bairro();
        this.cidade = usuario.cidade();
        this.estado = usuario.estado();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String usuario;
    private String email;

    @Embedded
    private CPF cpf;

    private String senha;
    private Long cep;
    private String rua;
    private String bairro;
    private String cidade;
    private String estado;
    private String status;

    @OneToOne(fetch = FetchType.LAZY)
    private Empresa empresa;

}
