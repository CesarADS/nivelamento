package com.example.demofx;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class FxApplication extends Application {
    @Override
    public void start(Stage stage) throws IOException {

        FXMLLoader fxmlLoader = new FXMLLoader(
                FxApplication.class.getResource("/com/example/demofx/cadastro-admin-view.fxml"));

        Scene scene = new Scene(fxmlLoader.load(), 400, 450);

        stage.setTitle("Cadastro de administrador - Nivelamento");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }
}