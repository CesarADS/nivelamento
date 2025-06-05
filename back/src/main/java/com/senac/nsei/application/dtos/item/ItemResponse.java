package com.senac.nsei.application.dtos.item;

import com.senac.nsei.domains.entities.ItemPedido;
import java.math.BigDecimal;

public record ItemResponse(
                Long idProduto,
                String nomeProduto,
                Integer quantidade,
                BigDecimal precoUnitario,
                BigDecimal subtotal
) {
        public ItemResponse(ItemPedido item) {
                this(
                                item.getProduto() != null ? item.getProduto().getId() : null,
                                item.getProduto() != null ? item.getProduto().getNome() : "Produto Desconhecido",
                                item.getQuantidade(),
                                item.getPrecoUnitario(),
                                item.getSubtotal()
                );
        }
}