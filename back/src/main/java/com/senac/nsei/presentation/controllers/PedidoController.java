package com.senac.nsei.presentation.controllers;

import com.senac.nsei.application.dtos.pedido.PedidoResponse;
import com.senac.nsei.application.dtos.pedido.PedidoSalvarRequest;
import com.senac.nsei.application.dtos.pedido.PedidoUpdateRequest;
import com.senac.nsei.application.services.interfaces.IPedidoService;
import com.senac.nsei.domains.entities.Usuario;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/pedidos")
@Tag(name = "Controlador de Pedidos", description = "Rotas para clientes gerenciarem seus pedidos.")
@SecurityRequirement(name = "bearerAuth") // Aplica segurança a todos os endpoints do controller
public class PedidoController {

    @Autowired
    private IPedidoService pedidoService;

    @PostMapping
    @Operation(summary = "Criar um novo pedido", description = "Cria um novo pedido para o cliente autenticado.")
    public ResponseEntity<?> criarPedido(@RequestBody @Valid PedidoSalvarRequest request) {
        try {
            Long clienteId = getUsuarioLogadoId();
            PedidoResponse response = pedidoService.criarPedido(request, clienteId);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/meus-pedidos")
    @Operation(summary = "Listar meus pedidos", description = "Retorna uma lista de todos os pedidos ativos do cliente autenticado.")
    public ResponseEntity<List<PedidoResponse>> listarMeusPedidos() {
        Long clienteId = getUsuarioLogadoId();
        List<PedidoResponse> response = pedidoService.listarMeusPedidos(clienteId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/meus-pedidos/{id}")
    @Operation(summary = "Buscar um pedido meu por ID", description = "Busca um pedido específico do cliente autenticado pelo seu ID.")
    public ResponseEntity<?> obterMeuPedidoPorId(@PathVariable Long id) {
        try {
            Long clienteId = getUsuarioLogadoId();
            PedidoResponse response = pedidoService.obterMeuPedidoPorId(id, clienteId);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @PutMapping("/meus-pedidos/{id}")
    @Operation(summary = "Editar um pedido meu", description = "Permite que o cliente autenticado edite um de seus pedidos existentes.")
    public ResponseEntity<?> editarMeuPedido(@PathVariable Long id, @RequestBody @Valid PedidoUpdateRequest request) {
        try {
            
            Long clienteId = getUsuarioLogadoId();
            pedidoService.obterMeuPedidoPorId(id, clienteId);

            PedidoResponse response = pedidoService.editarMeuPedido(id, request);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @DeleteMapping("/meus-pedidos/{id}")
    @Operation(summary = "Cancelar um pedido meu", description = "Muda o status de um pedido do cliente autenticado para INATIVO.")
    public ResponseEntity<?> cancelarMeuPedido(@PathVariable Long id) {
        try {
            
            Long clienteId = getUsuarioLogadoId();
            pedidoService.obterMeuPedidoPorId(id, clienteId);

            pedidoService.cancelarMeuPedido(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    private Long getUsuarioLogadoId() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuarioLogado = (Usuario) authentication.getPrincipal();
        return usuarioLogado.getId();
    }
}