package com.senac.nsei.application.services.interfaces;

import org.springframework.security.core.Authentication;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.senac.nsei.application.dtos.login.LoginResponse;

public interface IAuthenticationService {

    DecodedJWT validarToken(String token);
    LoginResponse obterLoginResponse(Authentication autenticacao);
    
}
