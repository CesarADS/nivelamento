package com.senac.nsei.presentation.controllers;

import com.senac.nsei.application.dtos.cliente.ClienteRequest;
import com.senac.nsei.application.dtos.cliente.ClienteResponse;
import com.senac.nsei.application.dtos.cliente.ClienteUpdateRequest;
import com.senac.nsei.application.services.interfaces.IClienteService;
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

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/clientes")
@Tag(name = "Controlador do Cliente", description = "Rotas para registro e gerenciamento do perfil do cliente.")
public class ClienteController {

    @Autowired
    private IClienteService clienteService;

    @PostMapping("/registrar")
    @Operation(summary = "Registrar um novo cliente", description = "Endpoint público para um novo usuário se registrar como cliente.")
    public ResponseEntity<?> registrarCliente(@RequestBody @Valid ClienteRequest request) {
        try {
            ClienteResponse response = clienteService.registrarCliente(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/meu-perfil")
    @Operation(summary = "Obter perfil do cliente logado", description = "Retorna os dados do perfil do cliente atualmente autenticado.", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ClienteResponse> obterMeuPerfil() {
        try {
            Long clienteId = getUsuarioLogadoId();
            ClienteResponse response = clienteService.obterPerfil(clienteId);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/meu-perfil")
    @Operation(summary = "Atualizar perfil do cliente logado", description = "Permite que o cliente atualmente autenticado atualize seus dados de perfil.", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<?> atualizarMeuPerfil(@RequestBody @Valid ClienteUpdateRequest request) {
        try {
            Long clienteId = getUsuarioLogadoId();
            ClienteResponse response = clienteService.atualizarPerfil(clienteId, request);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private Long getUsuarioLogadoId() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuarioLogado = (Usuario) authentication.getPrincipal();
        return usuarioLogado.getId();
    }
}