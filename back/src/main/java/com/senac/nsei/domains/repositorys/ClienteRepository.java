package com.senac.nsei.domains.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senac.nsei.domains.entities.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
}
