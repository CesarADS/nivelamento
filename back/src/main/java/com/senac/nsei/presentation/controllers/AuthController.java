package com.senac.nsei.presentation.controllers;

import com.senac.nsei.application.dtos.LoginRequest;
import com.senac.nsei.application.services.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Tag(name = "Controlador de autenticação", description = "Rota responsável pela autenticação de usuários para requisições a API.")
public class AuthController {

    @Autowired
    private TokenService tokenService;

    @PostMapping
    @Operation(summary = "Fazer login", description = "Retorna um token JWT para requisições a API caso o usuário seja válido.")
    public ResponseEntity<?> login(LoginRequest loginRequest) {
        var resultGerarToken = tokenService.gerarToken(loginRequest);
        return ResponseEntity.ok(resultGerarToken);
    }

}
