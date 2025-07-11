package com.senac.nsei.application.dtos.pedido;

import java.util.List;

import com.senac.nsei.application.dtos.item.ItemRequest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record PedidoSalvarRequest (

    @NotNull(message = "A lista de itens do pedido não pode ser nula.")
    @NotEmpty(message = "O pedido deve conter pelo menos um item.")
    @Valid
    List<ItemRequest> itensPedido

) {}
