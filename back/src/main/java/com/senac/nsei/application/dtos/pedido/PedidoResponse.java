package com.senac.nsei.application.dtos.pedido;

import com.senac.nsei.application.dtos.item.ItemResponse;
import com.senac.nsei.application.dtos.cliente.ClienteResponseSimplificado;
import com.senac.nsei.domains.entities.Pedido;
import com.senac.nsei.enums.ItemStatus; // Seu enum de status do pedido

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record PedidoResponse(
                Long id,
                LocalDateTime dataPedido,
                ItemStatus status,
                BigDecimal valorTotal,
                ClienteResponseSimplificado cliente,
                List<ItemResponse> itensPedido) {
        public PedidoResponse(Pedido pedido) {
                this(
                                pedido.getId(),
                                pedido.getDataPedido(),
                                pedido.getStatus(),
                                pedido.getValorTotal(),
                                pedido.getCliente() != null ? new ClienteResponseSimplificado(pedido.getCliente())
                                                : null,
                                pedido.getItens().stream()
                                                .map(ItemResponse::new)
                                                .collect(Collectors.toList()));
        }
}