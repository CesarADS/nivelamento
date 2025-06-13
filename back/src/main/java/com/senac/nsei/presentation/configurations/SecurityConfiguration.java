package com.senac.nsei.presentation.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; // Importar HttpMethod
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy; // Importar SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

        @Autowired
        private JwtFilter jwtFilter;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                return http
                                .cors(Customizer.withDefaults())
                                .csrf(AbstractHttpConfigurer::disable)
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Definir
                                                                                                         // política de
                                                                                                         // sessão como
                                                                                                         // stateless
                                .authorizeHttpRequests(authorize -> authorize
                                                // Endpoints públicos (corretos como estão)
                                                .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                                                .requestMatchers(HttpMethod.POST, "/api/clientes/registrar").permitAll()
                                                .requestMatchers(HttpMethod.POST, "/api/vendedores/registrar")
                                                .permitAll()
                                                .requestMatchers(HttpMethod.POST, "/api/setup/criar-primeiro-admin")
                                                .permitAll()
                                                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**",
                                                                "/swagger-resources/**", "/webjars/**")
                                                .permitAll()

                                                // Endpoints de ADMIN
                                                .requestMatchers("/api/admin/**").hasRole("ADMIN") // Apenas ADMIN pode
                                                                                                   // acessar

                                                // Endpoints de CLIENTE
                                                .requestMatchers("/api/pedidos/**").hasRole("CLIENTE")
                                                .requestMatchers("/api/clientes/meu-perfil").hasRole("CLIENTE")

                                                // Endpoints de VENDEDOR
                                                .requestMatchers("/api/produtos/meus-produtos/**").hasRole("VENDEDOR")
                                                .requestMatchers("/api/vendedores/meu-perfil").hasRole("VENDEDOR")
                                                .requestMatchers("/api/vendedores/meus-itens-vendidos")
                                                .hasRole("VENDEDOR")

                                                // Endpoints acessíveis por múltiplos roles (ex: catálogo de produtos)
                                                .requestMatchers(HttpMethod.GET, "/api/produtos", "/api/produtos/{id}")
                                                .hasAnyRole("CLIENTE", "VENDEDOR", "ADMIN")

                                                // Qualquer outra requisição precisa de autenticação (fallback)
                                                .anyRequest()
                                                .authenticated()                                                                                                    )
                                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                                .build();
        }

        // Bean para o AuthenticationManager
        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
                        throws Exception {
                return authenticationConfiguration.getAuthenticationManager();
        }

        // Bean para o PasswordEncoder
        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }
}