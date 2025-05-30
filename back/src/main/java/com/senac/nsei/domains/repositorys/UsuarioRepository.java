package com.senac.nsei.domains.repositorys;

import com.senac.nsei.domains.entities.UsuarioOld;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioOld, Long> {
}
