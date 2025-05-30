package com.senac.nsei.domains.entities;

import com.senac.nsei.enums.UsuarioRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "administradores")
public class Administrador extends Usuario {

    @Column(nullable = false, unique = true)
    private String email;

    public Administrador(String login, String password, String email) {
        super(login, password, UsuarioRole.ADMIN);
        this.email = email;
    }

}