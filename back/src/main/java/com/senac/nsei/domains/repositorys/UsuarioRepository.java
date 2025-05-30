package com.senac.nsei.domains.repositorys;

import com.senac.nsei.domains.entities.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<UserDetails> findByLogin(String login);

}
