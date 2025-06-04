package com.senac.nsei.application.services.interfaces;

import com.senac.nsei.application.dtos.cliente.ClienteRequest;
import com.senac.nsei.application.dtos.cliente.ClienteResponse;
import com.senac.nsei.application.dtos.cliente.ClienteUpdateRequest;

public interface IClienteService {
    
    ClienteResponse registrarCliente(ClienteRequest clienteRequest);
    ClienteResponse obterPerfil(Long clienteId);
    ClienteResponse atualizarPerfil(Long clienteId, ClienteUpdateRequest clienteUpdateRequest);

}
