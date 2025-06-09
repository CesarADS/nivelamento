package com.senac.nsei.domains.repositorys;

import com.senac.nsei.domains.entities.Produto;
import com.senac.nsei.enums.ItemStatus;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    
    List<Produto> findAllByStatus(ItemStatus status);
    
    @Query("SELECT p FROM Produto p WHERE p.status = :status AND p.empresa.vendedor.status = :status")
    List<Produto> findAllAtivosDeVendedoresAtivos(ItemStatus status);

}
