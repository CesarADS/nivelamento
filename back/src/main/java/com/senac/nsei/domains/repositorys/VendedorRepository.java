package com.senac.nsei.domains.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senac.nsei.domains.entities.Vendedor;

public interface VendedorRepository extends JpaRepository<Vendedor, Long> {
    
}
