package com.senac.nsei.application.services.interfaces;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.senac.nsei.application.dtos.LoginRequest;

public interface ITokenService {

    String gerarToken(LoginRequest loginRequest);
    DecodedJWT validarToken(String token);
    
}
