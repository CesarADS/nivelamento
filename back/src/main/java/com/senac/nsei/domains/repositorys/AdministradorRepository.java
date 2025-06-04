package com.senac.nsei.domains.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senac.nsei.domains.entities.Administrador;

public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
    
}
