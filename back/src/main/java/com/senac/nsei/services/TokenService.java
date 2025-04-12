package com.senac.nsei.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.senac.nsei.dtos.LoginRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${spring.expiration_time}")
    private Long expirationTime;

    @Value("${spring.secretkey}")
    private String secretkey;

    @Value("${spring.emissor}")
    private String emissor;

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
