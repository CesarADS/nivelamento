package com.senac.nsei.application.dtos.pedido;

import java.util.List;

import com.senac.nsei.application.dtos.item.ItemRequest;

public record PedidoSalvarRequest (

    String nome,
    List<ItemRequest> itensPedido

) {}
