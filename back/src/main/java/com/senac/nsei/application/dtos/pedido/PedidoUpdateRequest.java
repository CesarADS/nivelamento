package com.senac.nsei.application.dtos.pedido;

import java.util.List;

import com.senac.nsei.application.dtos.item.ItemRequest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record PedidoUpdateRequest(
    @NotNull(message = "A lista de itens do pedido não pode ser nula ao atualizar.")
    @NotEmpty(message = "O pedido deve conter pelo menos um item ao atualizar.")
    @Valid
    List<ItemRequest> itensPedido
) {
    
}
