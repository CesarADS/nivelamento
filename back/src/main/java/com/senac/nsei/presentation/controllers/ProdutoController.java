package com.senac.nsei.presentation.controllers;

import com.senac.nsei.application.dtos.produto.ProdutoResponse;
import com.senac.nsei.application.dtos.produto.ProdutoSalvarRequest;
import com.senac.nsei.application.services.interfaces.IProdutoService;
import com.senac.nsei.domains.entities.Produto;
import com.senac.nsei.domains.entities.Usuario;
import com.senac.nsei.domains.repositorys.ProdutoRepository; // Importado para verificação de posse
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/produtos")
@Tag(name = "Controlador de Produtos", description = "Rotas para visualização de catálogo e gerenciamento de produtos por vendedores.")
public class ProdutoController {

    @Autowired
    private IProdutoService produtoService;

    @Autowired
    private ProdutoRepository produtoRepository;

    // region Endpoints Públicos (Catálogo)
    @GetMapping
    @Operation(summary = "Listar todos os produtos para o catálogo", description = "Endpoint público que retorna uma lista de todos os produtos ativos de todos os vendedores.")
    public ResponseEntity<List<ProdutoResponse>> listarProdutosCatalogo() {
        // Agora chama o método de serviço otimizado
        List<ProdutoResponse> todosOsProdutos = produtoService.listarTodosProdutosParaCatalogo();
        return ResponseEntity.ok(todosOsProdutos);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obter um produto por ID", description = "Endpoint público para visualizar os detalhes de um produto específico.")
    public ResponseEntity<ProdutoResponse> obterProdutoPorId(@PathVariable Long id) {
        try {
            ProdutoResponse response = produtoService.obterProdutoPorId(id);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
    // endregion

    // region Endpoints Privados (Gerenciamento do Vendedor)
    @PostMapping("/meus-produtos")
    @Operation(summary = "Criar um novo produto", description = "Cria um novo produto para o vendedor autenticado.", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ProdutoResponse> criarMeuProduto(@RequestBody @Valid ProdutoSalvarRequest request) {
        Long vendedorId = getUsuarioLogadoId();
        ProdutoResponse response = produtoService.criarProduto(request, vendedorId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/meus-produtos")
    @Operation(summary = "Listar meus produtos", description = "Retorna uma lista de todos os produtos ativos do vendedor autenticado.", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<ProdutoResponse>> listarMeusProdutos() {
        Long vendedorId = getUsuarioLogadoId();
        List<ProdutoResponse> response = produtoService.listarMeusProdutos(vendedorId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/meus-produtos/{id}")
    @Operation(summary = "Atualizar um produto meu", description = "Permite que o vendedor autenticado atualize um de seus produtos.", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<?> atualizarMeuProduto(@PathVariable Long id,
            @RequestBody @Valid ProdutoSalvarRequest request) {
        try {
            verificarDonoDoProduto(id); // Garante a segurança antes de chamar o service
            ProdutoResponse response = produtoService.atualizarProduto(id, request);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @DeleteMapping("/meus-produtos/{id}")
    @Operation(summary = "Inativar um produto meu", description = "Muda o status de um produto do vendedor autenticado para INATIVO.", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<?> inativarMeuProduto(@PathVariable Long id) {
        try {
            verificarDonoDoProduto(id); // Garante a segurança antes de chamar o service
            produtoService.inativarProduto(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
    // endregion

    private Long getUsuarioLogadoId() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuarioLogado = (Usuario) authentication.getPrincipal();
        return usuarioLogado.getId();
    }

    private void verificarDonoDoProduto(Long produtoId) {
        Long vendedorId = getUsuarioLogadoId();
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new NoSuchElementException("Produto não encontrado com o ID: " + produtoId));

        if (!produto.getEmpresa().getVendedor().getId().equals(vendedorId)) {
            throw new SecurityException("Acesso negado: Este produto não pertence ao vendedor logado.");
        }
    }
}