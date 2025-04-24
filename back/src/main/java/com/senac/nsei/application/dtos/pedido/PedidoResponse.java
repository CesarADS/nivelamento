package com.senac.nsei.application.dtos.pedido;

import com.senac.nsei.application.dtos.item.ItemResponse;

import java.util.List;

public record PedidoResponse(

        String nome,
        List<ItemResponse> itensPedido,
        Double valorTotal,
        String status

) {}
