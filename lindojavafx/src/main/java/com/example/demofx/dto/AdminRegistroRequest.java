package com.example.demofx.dto;

import com.google.gson.annotations.SerializedName;

public class AdminRegistroRequest {

    private final String login;
    private final String email;
    private final String senha;

    @SerializedName("setupKey")
    private final String setupKey;

    public AdminRegistroRequest(String login, String email, String senha, String setupKey) {
        this.login = login;
        this.email = email;
        this.senha = senha;
        this.setupKey = setupKey;
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

    public String getSetupKey() {
        return setupKey;
    }

    
}