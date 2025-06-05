package com.senac.nsei.application.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.senac.nsei.application.dtos.login.LoginRequest;
import com.senac.nsei.application.dtos.login.LoginResponse;
import com.senac.nsei.application.services.interfaces.IAuthenticationService;
import com.senac.nsei.domains.entities.Usuario;
import com.senac.nsei.domains.repositorys.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class AuthenticationService implements IAuthenticationService, UserDetailsService {

    @Value("${spring.expiration_time}")
    private Long expirationTime;

    @Value("${spring.secretkey}")
    private String secretkey;

    @Value("${spring.emissor}")
    private String emissor;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        return usuarioRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com o login: " + login));
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        
        var usernamePasswordAuthToken = new UsernamePasswordAuthenticationToken(loginRequest.login(),
                loginRequest.senha());

        Authentication autenticacao = authenticationManager.authenticate(usernamePasswordAuthToken);

        Usuario usuarioAutenticado = (Usuario) autenticacao.getPrincipal();

        String token = gerarTokenParaUsuarioAutenticado(usuarioAutenticado);

        return new LoginResponse(
                token,
                usuarioAutenticado.getId(),
                usuarioAutenticado.getLogin(),
                usuarioAutenticado.getRole().name()
        );
    }

    private String gerarTokenParaUsuarioAutenticado(UserDetails userDetails) {

        try {
            Algorithm algorithm = Algorithm.HMAC256(secretkey);

            return JWT.create()
                    .withIssuer(emissor)
                    .withSubject(userDetails.getUsername())
                    .withExpiresAt(gerarDataExpiracao())
                    .sign(algorithm);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar token JWT para usuário autenticado", e);
        }
    }

    @Override
    public DecodedJWT validarToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretkey);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(emissor)
                    .build();
            return verifier.verify(token);
        } catch (Exception e) {
            System.err.println("Erro ao validar token: " + e.getMessage());
            throw new RuntimeException("Token JWT inválido ou expirado", e);
        }
    }

    private Instant gerarDataExpiracao() {
        return LocalDateTime.now()
                .plusMinutes(expirationTime)
                .toInstant(ZoneOffset.of("-03:00"));
    }
}