package com.example.demofx.controller;

import com.example.demofx.dto.AdminRegistroRequest;
import com.example.demofx.service.AdminRegistroService;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

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
        String secretKey = txtSecretKey.getText();
        String login = txtLogin.getText();
        String email = txtEmail.getText();
        String password = txtSenha.getText();

        if (secretKey.isEmpty() || login.isEmpty() || email.isEmpty() || password.isEmpty()) {
            mostrarMsg("Todos os campos são obrigatórios!");
            return;
        }

        AdminRegistroRequest requestDto = new AdminRegistroRequest(secretKey, login, email, password);

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

    @FXML
    protected void onVoltarMenu(ActionEvent event) {
        try {
            FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("/com/example/demofx/menu-view.fxml"));
            Scene menuScene = new Scene(fxmlLoader.load());
            Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
            stage.setScene(menuScene);
        } catch (Exception e) {
            mostrarMsg(e.getMessage());
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