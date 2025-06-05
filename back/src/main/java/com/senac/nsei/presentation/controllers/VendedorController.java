package com.senac.nsei.presentation.controllers;

import com.senac.nsei.application.dtos.vendedor.ItemVendidoResponse;
import com.senac.nsei.application.dtos.vendedor.VendedorRegistroRequest;
import com.senac.nsei.application.dtos.vendedor.VendedorResponse;
import com.senac.nsei.application.dtos.vendedor.VendedorUpdateRequest;
import com.senac.nsei.application.services.interfaces.IVendedorService;
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
@RequestMapping("/api/vendedores")
@Tag(name = "Controlador do Vendedor", description = "Rotas para registro, gerenciamento de perfil e consulta de vendas do vendedor.")
public class VendedorController {

    @Autowired
    private IVendedorService vendedorService;

    @PostMapping("/registrar")
    @Operation(summary = "Registrar um novo vendedor", description = "Endpoint público para registrar um novo vendedor e sua respectiva empresa.")
    public ResponseEntity<?> registrarVendedor(@RequestBody @Valid VendedorRegistroRequest request) {
        try {
            VendedorResponse response = vendedorService.registrarVendedor(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/meu-perfil")
    @Operation(summary = "Obter perfil do vendedor logado", description = "Retorna os dados do perfil do vendedor e de sua empresa.", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<VendedorResponse> obterMeuPerfil() {
        try {
            Long vendedorId = getUsuarioLogadoId();
            VendedorResponse response = vendedorService.obterPerfilComEmpresa(vendedorId);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/meu-perfil")
    @Operation(summary = "Atualizar perfil do vendedor logado", description = "Permite que o vendedor autenticado atualize seus dados e o nome fantasia da empresa.", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<?> atualizarMeuPerfil(@RequestBody @Valid VendedorUpdateRequest request) {
        try {
            Long vendedorId = getUsuarioLogadoId();
            VendedorResponse response = vendedorService.atualizarPerfilComEmpresa(vendedorId, request);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/meus-itens-vendidos")
    @Operation(summary = "Listar itens vendidos pelo vendedor logado", description = "Retorna uma lista de todos os itens de produtos que pertencem ao vendedor e que foram vendidos em pedidos.", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<ItemVendidoResponse>> listarMinhasVendas() {
        try {
            Long vendedorId = getUsuarioLogadoId();
            List<ItemVendidoResponse> response = vendedorService.listarMeusItensDePedidos(vendedorId);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    private Long getUsuarioLogadoId() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuarioLogado = (Usuario) authentication.getPrincipal();
        return usuarioLogado.getId();
    }
}