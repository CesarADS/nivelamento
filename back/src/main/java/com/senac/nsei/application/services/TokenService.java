package com.senac.nsei.application.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.senac.nsei.application.dtos.LoginRequest;
import com.senac.nsei.application.services.interfaces.ITokenService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService implements ITokenService {

    @Value("${spring.expiration_time}")
    private Long expirationTime;

    @Value("${spring.secretkey}")
    private String secretkey;

    @Value("${spring.emissor}")
    private String emissor;

    @Override
    public String gerarToken(LoginRequest loginRequest) {

        try {
            Algorithm algorithm = Algorithm.HMAC256(secretkey);

            String token = JWT.create()
                    .withIssuer(emissor)
                    .withSubject(loginRequest.email())
                    .withExpiresAt(this.gerarDataExpiracao())
                    .sign(algorithm);

            return token;

        } catch (Exception e) {
            return null;
        }

    }

    @Override
    public DecodedJWT validarToken(String token){

        Algorithm algorithm = Algorithm.HMAC256(secretkey);

        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(emissor).build();

        return verifier.verify(token);

    }

    private Instant gerarDataExpiracao() {
        return LocalDateTime.now()
                .plusMinutes(expirationTime)
                .toInstant(ZoneOffset.of("-03:00"));
    }

}
