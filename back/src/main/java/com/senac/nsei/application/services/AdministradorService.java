package com.senac.nsei.application.services;

import com.senac.nsei.application.dtos.administrador.AdministradorRegistroRequest;
import com.senac.nsei.application.dtos.administrador.AdministradorResponse;
import com.senac.nsei.application.dtos.administrador.AdministradorUpdateRequest;
import com.senac.nsei.application.dtos.pedido.PedidoResponse;
import com.senac.nsei.application.dtos.produto.ProdutoResponse;
import com.senac.nsei.application.dtos.usuario.UsuarioResponse;
import com.senac.nsei.application.services.interfaces.IAdministradorService;
import com.senac.nsei.domains.entities.*;
import com.senac.nsei.domains.repositorys.*;
import com.senac.nsei.enums.ItemStatus;
import com.senac.nsei.enums.UsuarioRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.senac.nsei.application.dtos.administrador.PrimeiroAdminRequest;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdministradorService implements IAdministradorService {

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SetupKeyService setupKeyService;

    @Override
    @Transactional
    public AdministradorResponse criarPrimeiroAdministrador(PrimeiroAdminRequest request) {
        // 1. Valida se o setup já não foi feito
        if (administradorRepository.count() > 0) {
            throw new IllegalStateException("O administrador inicial já foi configurado.");
        }

        // 2. Valida se a chave de setup é válida
        if (!setupKeyService.isKeyValid(request.setupKey())) {
            throw new SecurityException("Chave de configuração inválida ou expirada.");
        }

        // 3. Valida se o login já existe (embora não deva acontecer neste fluxo)
        if (usuarioRepository.findByLogin(request.login()).isPresent()) {
            throw new IllegalArgumentException("Login já existente.");
        }

        // 4. Cria o administrador
        String senhaCriptografada = passwordEncoder.encode(request.senha());
        Administrador novoAdmin = new Administrador(request.login(), senhaCriptografada, request.email());

        Administrador adminSalvo = administradorRepository.save(novoAdmin);

        // 5. Invalida a chave para que não possa ser usada novamente
        setupKeyService.invalidateKey();

        System.out.println("Primeiro administrador criado com sucesso pela aplicação externa.");

        return new AdministradorResponse(adminSalvo);
    }

    // GERENCIAMENTO DE ADMINISTRADORES

    @Override
    @Transactional(readOnly = true)
    public AdministradorResponse obterMeuPerfil(Long adminId) {
        Administrador admin = administradorRepository.findById(adminId)
                .orElseThrow(() -> new NoSuchElementException("Administrador não encontrado com o ID: " + adminId));
        return new AdministradorResponse(admin);
    }

    @Override
    @Transactional
    public AdministradorResponse criarAdministrador(AdministradorRegistroRequest request) {
        if (usuarioRepository.findByLogin(request.login()).isPresent()) {
            throw new IllegalArgumentException("Já existe um usuário com o login informado.");
        }
        String senhaCriptografada = passwordEncoder.encode(request.password());
        Administrador novoAdmin = new Administrador(request.login(), senhaCriptografada, request.email());
        Administrador adminSalvo = administradorRepository.save(novoAdmin);
        return new AdministradorResponse(adminSalvo);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdministradorResponse> listarAdministradores() {
        return administradorRepository.findAll().stream()
                .filter(admin -> admin.getStatus() == ItemStatus.ATIVO)
                .map(AdministradorResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void inativarAdministrador(Long id) {
        Administrador admin = administradorRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Administrador não encontrado com o ID: " + id));
        admin.setStatus(ItemStatus.INATIVO);
        administradorRepository.save(admin);
    }

    // GERENCIAMENTO DE USUÁRIOS
    @Override
    @Transactional(readOnly = true)
    public List<UsuarioResponse> listarTodosOsUsuarios(Optional<UsuarioRole> roleFiltro) {
        return usuarioRepository.findAll().stream()
                .filter(usuario -> roleFiltro.map(role -> usuario.getRole() == role).orElse(true))
                .map(UsuarioResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioResponse obterUsuarioPorId(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado com o ID: " + usuarioId));
        return UsuarioResponse.fromEntity(usuario);
    }

    @Override
    @Transactional
    public AdministradorResponse atualizarPerfil(Long adminId, AdministradorUpdateRequest request) {
        Administrador admin = administradorRepository.findById(adminId)
            .orElseThrow(() -> new NoSuchElementException("Administrador não encontrado com o ID: " + adminId));

        admin.setEmail(request.email());

        if (request.novaSenha() != null && !request.novaSenha().isBlank()) {
            admin.setPassword(passwordEncoder.encode(request.novaSenha()));
        }

        Administrador adminSalvo = administradorRepository.save(admin);
        
        return new AdministradorResponse(adminSalvo);
    }

    @Override
    @Transactional
    public void inativarUsuarioPorAdmin(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado com o ID: " + usuarioId));
        usuario.setStatus(ItemStatus.INATIVO);
        usuarioRepository.save(usuario);
    }

    // GERENCIAMENTO DE PEDIDOS
    @Override
    @Transactional(readOnly = true)
    public List<PedidoResponse> listarTodosOsPedidosAdmin(Optional<ItemStatus> statusFiltro) {
        return pedidoRepository.findAll().stream()
                .filter(pedido -> statusFiltro.map(status -> pedido.getStatus() == status).orElse(true))
                .map(PedidoResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PedidoResponse obterPedidoPorIdAdmin(Long pedidoId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new NoSuchElementException("Pedido não encontrado com o ID: " + pedidoId));
        return new PedidoResponse(pedido);
    }

    @Override
    @Transactional
    public void gerenciarStatusPedidoAdmin(Long pedidoId, ItemStatus novoStatus) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new NoSuchElementException("Pedido não encontrado com o ID: " + pedidoId));
        pedido.setStatus(novoStatus);
        pedidoRepository.save(pedido);
    }

    // GERENCIAMENTO DE PRODUTOS
    @Override
    @Transactional(readOnly = true)
    public List<ProdutoResponse> listarTodosOsProdutosAdmin(Optional<Long> vendedorIdFiltro) {
        return produtoRepository.findAll().stream()
                .filter(produto -> produto.getStatus() == ItemStatus.ATIVO)
                .filter(produto -> vendedorIdFiltro.map(id -> produto.getEmpresa().getVendedor().getId().equals(id))
                        .orElse(true))
                .map(ProdutoResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void inativarProdutoPorAdmin(Long produtoId) {
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new NoSuchElementException("Produto não encontrado com o ID: " + produtoId));
        produto.setStatus(ItemStatus.INATIVO);
        produtoRepository.save(produto);
    }
}