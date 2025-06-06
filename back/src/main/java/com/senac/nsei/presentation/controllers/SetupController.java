package com.senac.nsei.presentation.controllers;

import com.senac.nsei.application.dtos.administrador.PrimeiroAdminRequest;
import com.senac.nsei.application.dtos.administrador.AdministradorResponse;
import com.senac.nsei.application.services.interfaces.IAdministradorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/setup")
@Tag(name = "Controlador de Setup", description = "Rotas para a configuração inicial do sistema.")
public class SetupController {

    @Autowired
    private IAdministradorService administradorService;

    @PostMapping("/criar-primeiro-admin")
    @Operation(summary = "Criar o primeiro administrador", description = "Endpoint público de uso único para criar o primeiro administrador do sistema usando uma chave de setup.")
    public ResponseEntity<?> criarPrimeiroAdmin(@RequestBody @Valid PrimeiroAdminRequest request) {
        try {
            AdministradorResponse response = administradorService.criarPrimeiroAdministrador(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalStateException | IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
}