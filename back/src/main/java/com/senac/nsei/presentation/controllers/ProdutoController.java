package com.senac.nsei.presentation.controllers;

import com.senac.nsei.application.dtos.produto.ProdutoResponse;
import com.senac.nsei.application.dtos.produto.ProdutoSalvarRequest;
import com.senac.nsei.application.services.ProdutoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produto")
@Tag(name = "Controlador de produtos", description = "Rotas responsáveis pelo controle dos produtos.")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @PostMapping
    @Operation(summary = "Criar produto", description = "Cria um novo produto.")
    public ResponseEntity<ProdutoResponse> salvar(@RequestBody ProdutoSalvarRequest produto) {
        var responseSalvar = produtoService.salvarProduto(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseSalvar);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar produto", description = "Busca um produto pelo seu ID.")
    public ProdutoResponse buscarPorId(@PathVariable Long id) {
        return produtoService.buscarProdutoPorId(id);
    }

    @GetMapping
    @Operation(summary = "Listar produtos", description = "Lista todos os produtos.")
    public List<ProdutoResponse> buscarTudo() {
        return produtoService.listarTodos();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar produto", description = "Edita um produto pelo seu ID.")
    public ResponseEntity<ProdutoResponse> editar(@PathVariable Long id, @RequestBody ProdutoSalvarRequest produto) {
        var response = produtoService.editarProduto(id, produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Excluir produto", description = "Atualiza o status de um produto para Inativo.")
    public ResponseEntity<ProdutoResponse> exluir(@PathVariable Long id) {
        var response = produtoService.excluirProduto(id);
        return ResponseEntity.noContent().build();
    }

}
