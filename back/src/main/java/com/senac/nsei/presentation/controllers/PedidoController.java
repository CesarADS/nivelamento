package com.senac.nsei.presentation.controllers;

import com.senac.nsei.application.dtos.pedido.PedidoResponse;
import com.senac.nsei.application.dtos.pedido.PedidoSalvarRequest;
import com.senac.nsei.application.services.PedidoService;
import com.senac.nsei.domains.entities.Pedido;
import com.senac.nsei.domains.repositorys.PedidoRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/pedido")
@Tag(name = "Controlador de pedidos", description = "Rotas responsáveis pelo gerenciamento de pedidos")
public class PedidoController {

    @Autowired
    PedidoService pedidoService;

    @PostMapping
    @Operation(summary = "Criar pedido", description = "Cria um novo pedido.")
    public ResponseEntity<PedidoResponse> salvar(@RequestBody PedidoSalvarRequest pedido) {
        var responseSalvar = pedidoService.salvarPedido(pedido);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseSalvar);
    };

    @GetMapping("/{id}")
    @Operation(summary = "Buscar pedido", description = "Busca um pedido pelo seu ID.")
    public PedidoResponse buscarPorID(@PathVariable Long id) {
        return pedidoService.buscarPedidoPorId(id);
    }

    @GetMapping
    @Operation(summary = "Listar pedidos", description = "Lista todos os pedidos.")
    public List<PedidoResponse> listar() {
        return pedidoService.listarPedidos();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar pedido", description = "Edita um pedido existente pelo seu ID.")
    public ResponseEntity<PedidoResponse> editar(@PathVariable Long id, @RequestBody PedidoSalvarRequest pedido) {
        var responseEditar = pedidoService.editarPedido(id, pedido);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseEditar);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Mostra o pedido em String", description = "Converte um pedido em String.")
    public String converterParaString(@PathVariable Long id) {
        return pedidoService.toString(id);
    }
    

}
