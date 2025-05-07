package com.senac.nsei.application.services;

import java.util.Date;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senac.nsei.application.dtos.pedido.PedidoResponse;
import com.senac.nsei.application.dtos.pedido.PedidoSalvarRequest;
import com.senac.nsei.application.services.interfaces.IPedidoService;
import com.senac.nsei.domains.entities.ItemPedido;
import com.senac.nsei.domains.entities.Pedido;
import com.senac.nsei.domains.entities.Produto;
import com.senac.nsei.domains.repositorys.PedidoRepository;
import com.senac.nsei.domains.repositorys.ProdutoRepository;

@Service
public class PedidoService implements IPedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Override
    public PedidoResponse salvarPedido(PedidoSalvarRequest pedido) {
        
        var lPedido = new Pedido();

        lPedido.setNome(pedido.nome());
        lPedido.setStatus("Ativo");
        lPedido.setData(new Date());

        lPedido.setItens(
            pedido.itensPedido().stream().map(item -> {

                var lItem = new ItemPedido();
                Optional<Produto> produto = produtoRepository.findById(item.produtoId());

                lItem.setPedido(lPedido);
                lItem.setProduto(produto.get());
                lItem.setQuantidade(item.quantidade());
                lItem.setPrecoUnitario(produto.get().getPreco());

                return lItem;

            }).collect(Collectors.toList())
        );

        lPedido.calcularValorTotal();

        pedidoRepository.save(lPedido);

        return new PedidoResponse(lPedido); // CRIAR ESTE CONSTRUTOR PARA O DTO

    }

    }
}
