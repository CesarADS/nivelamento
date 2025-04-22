package com.senac.nsei.presentation.controllers;

import com.senac.nsei.application.dtos.usuario.UsuarioResponse;
import com.senac.nsei.application.dtos.usuario.UsuarioSalvarRequest;
import com.senac.nsei.application.services.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
@Tag(name = "Controlador de usuários", description = "Rotas responsáveis pelo controle dos usuários.")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    @Operation(summary = "Criar usuário", description = "Cria um novo usuário.")
    public ResponseEntity<UsuarioResponse> salvar(@RequestBody UsuarioSalvarRequest usuario) {
        var responseSalvar = usuarioService.salvarUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseSalvar);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar usuário", description = "Busca um usuário pelo seu ID.")
    public UsuarioResponse buscarPorID(@PathVariable Long id) {
        return usuarioService.buscarUsuarioPorId(id);
    }

    @GetMapping
    @Operation(summary = "Listar usuários", description = "Lista todos os usuários.")
    public List<UsuarioResponse> listarTodos() {
        return usuarioService.listarTodos();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar usuário", description = "Edita um usuário pelo seu ID.")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody UsuarioSalvarRequest usuario) {
        var response = usuarioService.editarUsuario(id, usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
