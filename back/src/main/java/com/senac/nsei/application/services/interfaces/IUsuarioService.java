package com.senac.nsei.application.services.interfaces;

import com.senac.nsei.application.dtos.usuario.UsuarioResponse;
import com.senac.nsei.application.dtos.usuario.UsuarioSalvarRequest;
import com.senac.nsei.domains.entities.Usuario;

import java.util.List;

public interface IUsuarioService {

    Usuario usuarioLogado();
    Usuario salvarUsuario(UsuarioSalvarRequest usuario);
    List<UsuarioResponse> listarTodos();

}
