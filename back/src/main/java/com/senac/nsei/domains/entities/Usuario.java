package com.senac.nsei.domains.entities;

import com.senac.nsei.application.dtos.usuario.UsuarioSalvarRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "usuario")
public class Usuario {

    public Usuario(Long id) {
    }

    public Usuario(UsuarioSalvarRequest usuario) {
        this.usuario = usuario.usuario();
        this.email = usuario.email();
        this.senha = usuario.senha();
        this.cep = usuario.cep();
        this.rua = usuario.rua();
        this.bairro = usuario.bairro();
        this.cidade = usuario.cidade();
        this.estado = usuario.estado();
        this.status = usuario.status();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String usuario;
    private String email;
    private String senha;
    private Long cep;
    private String rua;
    private String bairro;
    private String cidade;
    private String estado;
    private String status;


}
