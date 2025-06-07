package com.example.demofx.service;

import com.example.demofx.dto.AdminRegistroRequest;
import com.google.gson.Gson;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class AdminRegistroService {

    private final HttpClient httpClient;
    private final Gson gson;

    // link back
    private static final String API_URL = "http://localhost:8080/api/setup/criar-primeiro-admin";

    public AdminRegistroService() {
        this.httpClient = HttpClient.newHttpClient();
        this.gson = new Gson();
    }

    public HttpResponse<String> registerAdmin(
            AdminRegistroRequest adminData)
            throws IOException, InterruptedException {

        String jsonPayload = gson.toJson(adminData);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                .build();

        return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    }
}