package com.example.demofx.controller;

import com.example.demofx.dto.AdminRegistroRequest;
import com.example.demofx.service.AdminRegistroService;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;

import java.io.IOException;
import java.net.http.HttpResponse;

public class CadastroAdminController {

    @FXML
    private TextField txtSecretKey;

    @FXML
    private TextField txtLogin;

    @FXML
    private TextField txtEmail;

    @FXML
    private PasswordField txtSenha;

    private final AdminRegistroService registrationService = new AdminRegistroService();

    @FXML
    protected void onRegisterButtonClick() {
        
        String setupKey = txtSecretKey.getText();
        String login = txtLogin.getText();
        String email = txtEmail.getText();
        String password = txtSenha.getText();

        if (setupKey.isEmpty() || login.isEmpty() || email.isEmpty() || password.isEmpty()) {
            mostrarMsg("Todos os campos são obrigatórios!");
            return;
        }

        AdminRegistroRequest requestDto = new AdminRegistroRequest(login, email, password, setupKey);

        try {
            HttpResponse<String> response = registrationService.registerAdmin(requestDto);

            if (response.statusCode() == 201 || response.statusCode() == 200) {
                mostrarMsg("Administrador registrado com sucesso!");
            } else {
                mostrarMsg("Falha no registro: " + response.body());
            }

        } catch (IOException | InterruptedException e) {
            mostrarMsg("Erro ao conectar com o servidor: " + e.getMessage());
            Thread.currentThread().interrupt();
        }
    }

    private void mostrarMsg(String mensagem) {
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle("Alerta");
        alert.setHeaderText(null);
        alert.setContentText(mensagem);
        alert.showAndWait();
    }
}