package com.example.demofx.controller;

import java.io.IOException;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.stage.Stage;

public class MenuController {

    @FXML
    protected void onCadastrarProduto() {
        // Lógica para cadastro de produto
    }

    @FXML
    protected void onRegisterAdmin(ActionEvent event) {
        try {
            // Carrega a nova tela de registro de administrador
            FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("/com/example/demofx/cadastro-admin-view.fxml"));
            Scene scene = new Scene(fxmlLoader.load());
            Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
            stage.setScene(scene);
        } catch (IOException e) {
            mostrarMsg("Erro ao abrir a tela de registro: " + e.getMessage());
        }
    }

    @FXML
    protected void onVoltarLogin(ActionEvent event) {

        try {

                FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("/com/example/demofx/hello-view.fxml"));
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
