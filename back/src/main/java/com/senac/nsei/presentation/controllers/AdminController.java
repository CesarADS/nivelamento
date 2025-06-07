package com.senac.nsei.presentation.controllers;

import com.senac.nsei.application.dtos.administrador.AdministradorRegistroRequest;
import com.senac.nsei.application.dtos.administrador.AdministradorResponse;
import com.senac.nsei.application.dtos.pedido.PedidoResponse;
import com.senac.nsei.application.dtos.produto.ProdutoResponse;
import com.senac.nsei.application.dtos.usuario.UsuarioResponse;
import com.senac.nsei.application.dtos.usuario.UsuarioUpdateRequest;
import com.senac.nsei.application.services.interfaces.IAdministradorService;
import com.senac.nsei.enums.ItemStatus;
import com.senac.nsei.enums.UsuarioRole;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@Tag(name = "Controlador do Administrador", description = "Rotas para gerenciamento geral do sistema pelo Administrador.")
public class AdminController {

    @Autowired
    private IAdministradorService administradorService;

    // region Gerenciamento de Administradores
    @PostMapping("/administradores")
    @Operation(summary = "Criar um novo administrador", description = "Endpoint para registrar um novo usuário com perfil de administrador.")
    public ResponseEntity<?> criarAdministrador(@RequestBody @Valid AdministradorRegistroRequest request) {
        try {
            AdministradorResponse response = administradorService.criarAdministrador(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/administradores")
    @Operation(summary = "Listar todos os administradores", description = "Retorna uma lista de todos os administradores com status ATIVO.")
    public ResponseEntity<List<AdministradorResponse>> listarAdministradores() {
        return ResponseEntity.ok(administradorService.listarAdministradores());
    }

    @DeleteMapping("/administradores/{id}")
    @Operation(summary = "Inativar um administrador", description = "Muda o status de um administrador para INATIVO (soft delete).")
    public ResponseEntity<Void> inativarAdministrador(@PathVariable Long id) {
        try {
            administradorService.inativarAdministrador(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
    // endregion

    // region Gerenciamento de Usuários
    @GetMapping("/usuarios")
    @Operation(summary = "Listar todos os usuários", description = "Retorna uma lista de todos os usuários, com filtro opcional por role (CLIENTE, VENDEDOR, ADMIN).")
    public ResponseEntity<List<UsuarioResponse>> listarTodosOsUsuarios(@RequestParam Optional<UsuarioRole> role) {
        return ResponseEntity.ok(administradorService.listarTodosOsUsuarios(role));
    }

    @GetMapping("/usuarios/{id}")
    @Operation(summary = "Obter um usuário por ID", description = "Busca e retorna os dados básicos de um usuário específico.")
    public ResponseEntity<UsuarioResponse> obterUsuarioPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(administradorService.obterUsuarioPorId(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/usuarios/{id}")
    @Operation(summary = "Atualizar dados de um usuário", description = "Permite que o administrador atualize informações de qualquer usuário.")
    public ResponseEntity<?> atualizarUsuario(@PathVariable Long id, @RequestBody @Valid UsuarioUpdateRequest request) { 
        try {
            UsuarioResponse response = administradorService.atualizarDadosDeUsuarioPorAdmin(id, request);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/usuarios/{id}")
    @Operation(summary = "Inativar um usuário", description = "Muda o status de um usuário (cliente ou vendedor) para INATIVO.")
    public ResponseEntity<Void> inativarUsuario(@PathVariable Long id) {
        try {
            administradorService.inativarUsuarioPorAdmin(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
    // endregion

    // region Gerenciamento de Pedidos
    @GetMapping("/pedidos")
    @Operation(summary = "Listar todos os pedidos", description = "Retorna uma lista de todos os pedidos, com filtro opcional por status (ATIVO, INATIVO).")
    public ResponseEntity<List<PedidoResponse>> listarTodosOsPedidos(@RequestParam Optional<ItemStatus> status) {
        return ResponseEntity.ok(administradorService.listarTodosOsPedidosAdmin(status));
    }

    @PatchMapping("/pedidos/{id}/status")
    @Operation(summary = "Alterar o status de um pedido", description = "Altera o status de um pedido específico (ex: para INATIVO).")
    public ResponseEntity<Void> gerenciarStatusPedido(@PathVariable Long id, @RequestParam ItemStatus novoStatus) {
        try {
            administradorService.gerenciarStatusPedidoAdmin(id, novoStatus);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
    // endregion

    // region Gerenciamento de Produtos
    @GetMapping("/produtos")
    @Operation(summary = "Listar todos os produtos", description = "Retorna uma lista de todos os produtos ativos, com filtro opcional por ID do vendedor.")
    public ResponseEntity<List<ProdutoResponse>> listarTodosOsProdutos(@RequestParam Optional<Long> vendedorId) {
        return ResponseEntity.ok(administradorService.listarTodosOsProdutosAdmin(vendedorId));
    }

    @DeleteMapping("/produtos/{id}")
    @Operation(summary = "Inativar um produto", description = "Muda o status de um produto para INATIVO.")
    public ResponseEntity<Void> inativarProduto(@PathVariable Long id) {
        try {
            administradorService.inativarProdutoPorAdmin(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
    // endregion
}