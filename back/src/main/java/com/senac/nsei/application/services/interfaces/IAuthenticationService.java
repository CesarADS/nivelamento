package com.senac.nsei.application.services.interfaces;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.senac.nsei.application.dtos.login.LoginRequest;
import com.senac.nsei.application.dtos.login.LoginResponse;

public interface IAuthenticationService {

    DecodedJWT validarToken(String token);
    LoginResponse login(LoginRequest loginRequest);
    
}
