package com.example.demofx.dto; // Garanta que o nome do pacote está correto

import com.google.gson.annotations.SerializedName;

public class AdminRegistroRequest {

    @SerializedName("secret_key")
    private final String secretKey;
    private final String login;
    private final String email;

    @SerializedName("password")
    private final String senha;

    public AdminRegistroRequest(String secretKey, String login, String email, String senha) {
        this.secretKey = secretKey;
        this.login = login;
        this.email = email;
        this.senha = senha;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public String getLogin() {
        return login;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }
}