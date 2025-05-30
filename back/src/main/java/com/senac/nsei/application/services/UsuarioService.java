package com.senac.nsei.application.services;

import com.senac.nsei.application.dtos.usuario.UsuarioResponse;
import com.senac.nsei.application.dtos.usuario.UsuarioSalvarRequest;
import com.senac.nsei.application.services.interfaces.IUsuarioService;
import com.senac.nsei.domains.entities.UsuarioOld;
import com.senac.nsei.domains.repositorys.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UsuarioOld usuarioLogado() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        String usuario = auth.getName();
        return usuarioRepository
                .findById(Long.valueOf(usuario))
                .orElse(null);

    }

    @Override
    public UsuarioResponse salvarUsuario(UsuarioSalvarRequest usuario) {
        var lUsuario = new UsuarioOld(usuario);
        lUsuario.setStatus("Ativo");
        usuarioRepository.save(lUsuario);
        return new UsuarioResponse(lUsuario);
    }

    @Override
    public List<UsuarioResponse> listarTodos() {
        return usuarioRepository
                .findAll()
                .stream()
                .filter(usuario -> "Ativo".equals(usuario.getStatus()))
                .map(UsuarioResponse::new)
                .toList();
    }

    @Override
    public UsuarioResponse buscarUsuarioPorId(Long id) {
        return usuarioRepository.findById(id).map(UsuarioResponse::new).orElse(null);
    }

    @Override
    public UsuarioResponse editarUsuario(Long id, UsuarioSalvarRequest usuario) {
        
        UsuarioOld userSearch = usuarioRepository.findById(id).orElse(null);

        UsuarioOld usuarioSalvar = new UsuarioOld(usuario);
        usuarioSalvar.setId(userSearch.getId());
        usuarioSalvar.setStatus(userSearch.getStatus());

        UsuarioOld response = usuarioRepository.save(usuarioSalvar);

        return new UsuarioResponse(response);
        
    }

    @Override
    public UsuarioResponse excluirUsuario(Long id) {

        UsuarioOld userSearch = usuarioRepository.findById(id).orElse(null);

        userSearch.setStatus("Inativo");

        UsuarioOld response = usuarioRepository.save(userSearch);

        return new UsuarioResponse(response);

    }

}
