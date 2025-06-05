package com.senac.nsei.presentation.controllers;

import com.senac.nsei.application.dtos.login.LoginRequest;
import com.senac.nsei.application.dtos.login.LoginResponse;
import com.senac.nsei.application.services.interfaces.IAuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Tag(name = "Controlador de Autenticação", description = "Rota responsável pela autenticação de usuários.")
public class AuthController {

    @Autowired
    private IAuthenticationService authenticationService;

    @PostMapping("/login")
    @Operation(summary = "Fazer login", description = "Autentica um usuário e retorna um token JWT se as credenciais forem válidas.")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest) {
        try {
            LoginResponse response = authenticationService.login(loginRequest);
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            
            return ResponseEntity.status(401).body("Login e/ou senha inválidos.");
        }
    }
}