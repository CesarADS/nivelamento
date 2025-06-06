package com.senac.nsei.application.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.senac.nsei.application.dtos.administrador.AdministradorRegistroRequest;
import com.senac.nsei.application.dtos.administrador.AdministradorResponse;
import com.senac.nsei.application.dtos.administrador.PrimeiroAdminRequest;
import com.senac.nsei.application.dtos.pedido.PedidoResponse;
import com.senac.nsei.application.dtos.produto.ProdutoResponse;
import com.senac.nsei.application.dtos.usuario.UsuarioResponse;
import com.senac.nsei.application.dtos.usuario.UsuarioUpdateRequest;
import com.senac.nsei.enums.ItemStatus;
import com.senac.nsei.enums.UsuarioRole;

public interface IAdministradorService {

    AdministradorResponse criarAdministrador(AdministradorRegistroRequest administrador);
    List<AdministradorResponse> listarAdministradores();
    void inativarAdministrador(Long id);

    List<UsuarioResponse> listarTodosOsUsuarios(Optional<UsuarioRole> roleFiltro);

    UsuarioResponse obterUsuarioPorId(Long usarioId);

    UsuarioResponse atualizarDadosDeUsuarioPorAdmin(Long usuarioId, UsuarioUpdateRequest usuarioUpdateRequest);

    void inativarUsuarioPorAdmin(Long usuarioId);

    List<PedidoResponse> listarTodosOsPedidosAdmin(Optional<ItemStatus> statusFiltro);
    
    PedidoResponse obterPedidoPorIdAdmin(Long pedidoId);

    void gerenciarStatusPedidoAdmin(Long pedidoId, ItemStatus novoStatus);

    List<ProdutoResponse> listarTodosOsProdutosAdmin(Optional<Long> vendedorIdFiltro);

    void inativarProdutoPorAdmin(Long produtoId);

    AdministradorResponse criarPrimeiroAdministrador(PrimeiroAdminRequest request);


}
