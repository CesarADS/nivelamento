package com.senac.nsei.application.dtos.item;

import com.senac.nsei.domains.entities.ItemPedido;

public record ItemResponse(
        String nome,
        Integer quantidade,
        Double preco_unitario
) {
        public ItemResponse(ItemPedido item) {
                this (
                        item.getProduto().getNome(),
                        item.getQuantidade(),
                        item.getPrecoUnitario()
                );
        }
}
