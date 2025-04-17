package com.senac.nsei.presentation.controllers;

import com.senac.nsei.application.dtos.usuario.UsuarioResponse;
import com.senac.nsei.application.dtos.usuario.UsuarioSalvarRequest;
import com.senac.nsei.application.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
@Tag(name = "Usuario", description = "Rotas responsável pelo controle dos usuários.")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @PostMapping
    @Operation(summary = "salvarUsuario", description = "Método para criar um novo usuário.")
    public ResponseEntity<?> salvar(@RequestBody UsuarioSalvarRequest usuario) {
        var responseSalvar = usuarioService.salvarUsuario(usuario);
        return ResponseEntity.ok(responseSalvar);
    }
/*
    @GetMapping("/{id}")
    public Usuario buscarPorID(@PathVariable Long id) {
        return usuarioRepository.findById(id).get();
    }*/

    @GetMapping
    public List<UsuarioResponse> listarTodos() {

        return usuarioService.listarTodos();
    }
/*
    @PutMapping
    public ResponseEntity<?> editar(@RequestBody Usuario usuario) {
        var response = usuarioRepository.save(usuario);
        return ResponseEntity.ok(response);
    }*/

}
