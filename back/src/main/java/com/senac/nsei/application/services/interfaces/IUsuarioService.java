package com.senac.nsei.application.services.interfaces;

import com.senac.nsei.application.dtos.usuario.UsuarioResponse;
import com.senac.nsei.application.dtos.usuario.UsuarioSalvarRequest;
import com.senac.nsei.domains.entities.Usuario;

import java.util.List;

public interface IUsuarioService {

    Usuario usuarioLogado();
    UsuarioResponse salvarUsuario(UsuarioSalvarRequest usuario);
    List<UsuarioResponse> listarTodos();
    UsuarioResponse buscarUsuarioPorId(Long id);
    UsuarioResponse editarUsuario(Long id, UsuarioSalvarRequest usuario);

}
