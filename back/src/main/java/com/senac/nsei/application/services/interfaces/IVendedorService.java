package com.senac.nsei.application.services.interfaces;

import java.util.List;

import com.senac.nsei.application.dtos.vendedor.ItemVendidoResponse;
import com.senac.nsei.application.dtos.vendedor.VendedorRegistroRequest;
import com.senac.nsei.application.dtos.vendedor.VendedorResponse;
import com.senac.nsei.application.dtos.vendedor.VendedorUpdateRequest;

public interface IVendedorService {

    VendedorResponse registrarVendedor(VendedorRegistroRequest vendedorRegistroRequest);
    VendedorResponse obterPerfilComEmpresa(Long vendedorId);
    VendedorResponse atualizarPerfilComEmpresa(Long vendedorId, VendedorUpdateRequest vendedorUpdateRequest);
    List<ItemVendidoResponse> listarMeusItensDePedidos(Long vendedorId);
    
}
