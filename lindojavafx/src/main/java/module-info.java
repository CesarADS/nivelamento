module com.example.demofx {
    requires javafx.controls;
    requires javafx.fxml;

    requires java.net.http;
    requires com.google.gson;

    opens com.example.demofx to javafx.fxml;
    opens com.example.demofx.controller to javafx.fxml;
    opens com.example.demofx.dto to com.google.gson;

    exports com.example.demofx;
    exports com.example.demofx.controller;
    exports com.example.demofx.dto;
}