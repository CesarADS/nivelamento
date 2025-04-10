package com.senac.nsei.controllers;

import com.senac.nsei.models.entities.Pedido;
import com.senac.nsei.models.repositorys.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedido")
public class PedidoController {

    @Autowired
    PedidoRepository pedidoRepository;

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Pedido pedido) {
        var responseSalvar = pedidoRepository.save(pedido);
        return ResponseEntity.ok(responseSalvar);
    };

    @GetMapping("/{id}")
    public Pedido buscarPorID(@PathVariable Long id) {
        return pedidoRepository.findById(id).get();
    }

    @GetMapping
    public List<Pedido> listar() {
        return pedidoRepository.findAll();
    }

    @PutMapping
    public ResponseEntity<?> editar(@RequestBody Pedido pedido) {
        var responseEditar = pedidoRepository.save(pedido);
        return ResponseEntity.ok(responseEditar);
    }

}
