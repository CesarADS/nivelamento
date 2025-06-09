package com.senac.nsei.application.services;

import com.senac.nsei.application.dtos.vendedor.ItemVendidoResponse;
import com.senac.nsei.application.dtos.vendedor.VendedorRegistroRequest;
import com.senac.nsei.application.dtos.vendedor.VendedorResponse;
import com.senac.nsei.application.dtos.vendedor.VendedorUpdateRequest;
import com.senac.nsei.application.services.interfaces.IVendedorService;
import com.senac.nsei.domains.entities.Empresa;
import com.senac.nsei.domains.entities.ItemPedido;
import com.senac.nsei.domains.entities.Vendedor;
import com.senac.nsei.domains.repositorys.ItemPedidoRepository;
import com.senac.nsei.domains.repositorys.UsuarioRepository;
import com.senac.nsei.domains.repositorys.VendedorRepository;
import com.senac.nsei.domains.valueobjects.CNPJ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class VendedorService implements IVendedorService {

    @Autowired
    private VendedorRepository vendedorRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public VendedorResponse registrarVendedor(VendedorRegistroRequest request) {
        if (usuarioRepository.findByLogin(request.login()).isPresent()) {
            throw new IllegalArgumentException("Já existe um usuário com o login informado.");
        }

        // 1. Criar e salvar a Empresa e o Vendedor
        CNPJ cnpj = new CNPJ(request.cnpj());
        String senhaCriptografada = passwordEncoder.encode(request.senha());

        // Cria a empresa
        Empresa novaEmpresa = new Empresa(cnpj, request.razaoSocial(), request.nomeFantasia());

        // Cria o vendedor
        Vendedor novoVendedor = new Vendedor(
                request.login(),
                senhaCriptografada,
                request.nomeCompleto(),
                request.email(),
                request.telefone(),
                novaEmpresa // Associa a nova empresa
        );

        // Associa o vendedor à empresa para a relação bidirecional
        novaEmpresa.setVendedor(novoVendedor);

        // Salva o vendedor (e a empresa por cascata)
        Vendedor vendedorSalvo = vendedorRepository.save(novoVendedor);

        // 2. Retornar o DTO de resposta
        return new VendedorResponse(vendedorSalvo);
    }

    @Override
    @Transactional(readOnly = true)
    public VendedorResponse obterPerfilComEmpresa(Long vendedorId) {
        Vendedor vendedor = vendedorRepository.findById(vendedorId)
                .orElseThrow(() -> new NoSuchElementException("Vendedor não encontrado com o ID: " + vendedorId));

        return new VendedorResponse(vendedor);
    }

    @Override
    @Transactional
    public VendedorResponse atualizarPerfilComEmpresa(Long vendedorId, VendedorUpdateRequest updateRequest) {
        Vendedor vendedor = vendedorRepository.findById(vendedorId)
                .orElseThrow(() -> new NoSuchElementException("Vendedor não encontrado com o ID: " + vendedorId));

        if (updateRequest.senha() != null && !updateRequest.senha().isBlank()) {
            vendedor.setPassword(passwordEncoder.encode(updateRequest.senha()));
        }

        vendedor.setTelefone(updateRequest.telefone());

        // Acessa e atualiza a empresa associada
        Empresa empresa = vendedor.getEmpresa();
        empresa.setNomeFantasia(updateRequest.nomeFantasia());

        Vendedor vendedorAtualizado = vendedorRepository.save(vendedor);

        return new VendedorResponse(vendedorAtualizado);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ItemVendidoResponse> listarMeusItensDePedidos(Long vendedorId) {
        // Valida se o vendedor existe
        if (!vendedorRepository.existsById(vendedorId)) {
            throw new NoSuchElementException("Vendedor não encontrado com o ID: " + vendedorId);
        }

        List<ItemPedido> itens = itemPedidoRepository.findAllByProdutoEmpresaVendedorId(vendedorId);

        return itens.stream()
                .map(ItemVendidoResponse::new)
                .collect(Collectors.toList());
    }
}