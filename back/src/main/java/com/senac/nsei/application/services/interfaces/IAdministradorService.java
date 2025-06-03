package com.senac.nsei.application.services.interfaces;

import java.util.List;

import com.senac.nsei.application.dtos.administrador.AdministradorRequest;
import com.senac.nsei.application.dtos.administrador.AdministradorResponse;

public interface IAdministradorService {

    public AdministradorResponse criarUserAdm(AdministradorRequest administrador);
    public List<AdministradorResponse> listarUsuariosAdm();
    public void apagarUserAdm(Long id);

    // listarUsuariosCliente()
    public void apagarUserCliente(Long id);

    // listarUsuariosVendedor()
    public void apagarUserVendedor(Long id);

    // listarPedidos()
    public void apagarPedido(Long id);

    // listarProdutos()
    public void apagarProduto(Long id);
    


}
