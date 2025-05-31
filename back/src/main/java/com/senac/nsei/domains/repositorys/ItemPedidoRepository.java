package com.senac.nsei.domains.repositorys;

import com.senac.nsei.domains.entities.ItemPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long> {

    @Query("SELECT i FROM ItemPedido i JOIN i.produto p JOIN p.empresa e WHERE e.vendedor.id = :vendedorId")
    List<ItemPedido> findAllByProdutoEmpresaVendedorId(@Param("vendedorId") Long vendedorId);

}