package com.senac.nsei.application.services.interfaces;

import java.util.List;

import com.senac.nsei.application.dtos.pedido.PedidoResponse;
import com.senac.nsei.application.dtos.pedido.PedidoSalvarRequest;
import com.senac.nsei.application.dtos.pedido.PedidoUpdateRequest;

public interface IPedidoService {

    PedidoResponse criarPedido(PedidoSalvarRequest pedidoSalvarRequest, Long clienteId);
    PedidoResponse editarMeuPedido(Long pedidoId, PedidoUpdateRequest pedidoUpdateRequest);
    void cancelarMeuPedido(Long pedidoId);
    List<PedidoResponse> listarMeusPedidos(Long clienteId);
    PedidoResponse obterMeuPedidoPorId(Long pedidoId, Long clienteId);
    
}
