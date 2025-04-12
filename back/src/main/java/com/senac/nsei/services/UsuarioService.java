package com.senac.nsei.services;

import com.senac.nsei.models.entities.Usuario;
import com.senac.nsei.models.repositorys.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario usuarioLogado() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        String usuario = auth.getName();
        return usuarioRepository
                .findById(Long.valueOf(usuario))
                .orElse(null);

    }

}
