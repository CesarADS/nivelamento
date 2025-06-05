package com.senac.nsei.application.dtos.vendedor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.senac.nsei.application.dtos.cliente.ClienteResponseSimplificado;
import com.senac.nsei.domains.entities.ItemPedido;
import com.senac.nsei.enums.ItemStatus;

public record ItemVendidoResponse(
        Long idItemPedido,
        Long idPedidoOriginal,
        LocalDateTime datePedidoOriginal,
        String nomeProduto,
        Integer quantidadeVendida,
        BigDecimal precoUnitarioCobrado,
        BigDecimal subTotalItem,
        ItemStatus statusPedidoOriginal,
        ClienteResponseSimplificado dadosCliente) {
    public ItemVendidoResponse(ItemPedido itemPedido) {
        this(
                itemPedido.getId(),
                itemPedido.getPedido().getId(),
                itemPedido.getPedido().getDataPedido(),
                itemPedido.getProduto().getNome(),
                itemPedido.getQuantidade(),
                itemPedido.getPrecoUnitario(),
                itemPedido.getSubtotal(),
                itemPedido.getPedido().getStatus(),
                new ClienteResponseSimplificado(itemPedido.getPedido().getCliente()));
    }
}