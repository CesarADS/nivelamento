package com.senac.nsei.application.services;

import com.senac.nsei.application.dtos.usuario.UsuarioResponse;
import com.senac.nsei.application.dtos.usuario.UsuarioSalvarRequest;
import com.senac.nsei.application.services.interfaces.IUsuarioService;
import com.senac.nsei.domains.entities.Usuario;
import com.senac.nsei.domains.repositorys.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.net.InetSocketAddress;
import java.util.List;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Usuario usuarioLogado() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        String usuario = auth.getName();
        return usuarioRepository
                .findById(Long.valueOf(usuario))
                .orElse(null);

    }

    @Override
    public Usuario salvarUsuario(UsuarioSalvarRequest usuario) {
        var lUsuario = new Usuario(usuario);
        return usuarioRepository.save(lUsuario);
    }

    @Override
    public List<UsuarioResponse> listarTodos() {
        return usuarioRepository.findAll().stream().map(UsuarioResponse::new).toList();
    }

}
