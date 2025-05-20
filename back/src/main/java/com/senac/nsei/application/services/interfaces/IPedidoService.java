package com.senac.nsei.application.services.interfaces;

import java.util.List;

import com.senac.nsei.application.dtos.pedido.PedidoResponse;
import com.senac.nsei.application.dtos.pedido.PedidoSalvarRequest;

public interface IPedidoService {

    PedidoResponse salvarPedido(PedidoSalvarRequest pedido);
    PedidoResponse buscarPedidoPorId(Long id);
    PedidoResponse editarPedido(Long id, PedidoSalvarRequest pedido);
    List<PedidoResponse> listarPedidos();
    String toString(Long id);
    
}
