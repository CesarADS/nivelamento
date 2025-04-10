package com.senac.nsei.controllers;

import com.senac.nsei.models.entities.Usuario;
import com.senac.nsei.models.repositorys.UsuarioRepository;
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
    private UsuarioRepository usuarioRepository;

    @PostMapping
    @Operation(summary = "salvarUsuario", description = "Método para criar um novo usuário.")
    public ResponseEntity<?> salvar(@RequestBody Usuario usuario) {
        var responseSalvar = usuarioRepository.save(usuario);
        return ResponseEntity.ok(responseSalvar);
    }

    @GetMapping("/{id}")
    public Usuario buscarPorID(@PathVariable Long id) {
        return usuarioRepository.findById(id).get();
    }

    @GetMapping
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    @PutMapping
    public ResponseEntity<?> editar(@RequestBody Usuario usuario) {
        var response = usuarioRepository.save(usuario);
        return ResponseEntity.ok(response);
    }

}
