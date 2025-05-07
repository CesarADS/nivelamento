package com.senac.nsei.application.dtos.pedido;

import com.senac.nsei.application.dtos.item.ItemResponse;
import com.senac.nsei.domains.entities.Pedido;

import java.util.List;
import java.util.stream.Collectors;

public record PedidoResponse(

        String nome,
        List<ItemResponse> itensPedido,
        Double valorTotal,
        String status

) {
        public PedidoResponse(Pedido pedido) {
                this (
                        pedido.getNome(),
                        pedido.getItens().stream().map(item -> new ItemResponse(item)).collect(Collectors.toList()),
                        pedido.getValorTotal(),
                        pedido.getStatus()
                );
        }
}
