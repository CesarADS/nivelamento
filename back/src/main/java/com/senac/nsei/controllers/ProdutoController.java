package com.senac.nsei.controllers;

import com.senac.nsei.models.entities.Produto;
import com.senac.nsei.models.repositorys.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Produto produto) {
        var responseProduto = produtoRepository.save(produto);
        return ResponseEntity.ok(responseProduto);
    }

    @GetMapping("/{id}")
    public Produto buscarPorId(@PathVariable Long id) {
        return produtoRepository.findById(id).get();
    }

    @GetMapping
    public List<Produto> buscarTudo() {
        return produtoRepository.findAll();
    }

    @PutMapping
    public ResponseEntity<?> editar(@RequestBody Produto produto) {
        var response = produtoRepository.save(produto);
        return ResponseEntity.ok(response);
    }

}
