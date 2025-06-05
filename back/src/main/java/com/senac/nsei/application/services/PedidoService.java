package com.senac.nsei.application.services;

import com.senac.nsei.application.dtos.item.ItemRequest;
import com.senac.nsei.application.dtos.pedido.PedidoResponse;
import com.senac.nsei.application.dtos.pedido.PedidoSalvarRequest;
import com.senac.nsei.application.dtos.pedido.PedidoUpdateRequest;
import com.senac.nsei.application.services.interfaces.IPedidoService;
import com.senac.nsei.domains.entities.Cliente;
import com.senac.nsei.domains.entities.ItemPedido;
import com.senac.nsei.domains.entities.Pedido;
import com.senac.nsei.domains.entities.Produto;
import com.senac.nsei.domains.repositorys.ClienteRepository;
import com.senac.nsei.domains.repositorys.PedidoRepository;
import com.senac.nsei.domains.repositorys.ProdutoRepository;
import com.senac.nsei.enums.ItemStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class PedidoService implements IPedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Override
    @Transactional
    public PedidoResponse criarPedido(PedidoSalvarRequest pedidoSalvarRequest, Long clienteId) {
        // Busca o cliente que está fazendo o pedido
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new NoSuchElementException("Cliente não encontrado com o ID: " + clienteId));

        // Cria uma nova instância de Pedido, associando ao cliente
        Pedido novoPedido = new Pedido(cliente);

        // Mapeia os DTOs de item para entidades ItemPedido e adiciona ao pedido
        for (ItemRequest itemDto : pedidoSalvarRequest.itensPedido()) {
            Produto produto = produtoRepository.findById(itemDto.produtoId())
                    .orElseThrow(() -> new NoSuchElementException(
                            "Produto não encontrado com o ID: " + itemDto.produtoId()));

            ItemPedido itemPedido = new ItemPedido(novoPedido, produto, itemDto.quantidade());
            novoPedido.adicionarItem(itemPedido);
        }

        // Salva o pedido e seus itens (por cascata) e recalcula o total
        Pedido pedidoSalvo = pedidoRepository.save(novoPedido);

        return new PedidoResponse(pedidoSalvo);
    }

    @Override
    @Transactional
    public PedidoResponse editarMeuPedido(Long pedidoId, PedidoUpdateRequest pedidoUpdateRequest) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new NoSuchElementException("Pedido não encontrado com o ID: " + pedidoId));

        // Limpa a lista de itens atual para substituir pelos novos
        pedido.getItens().clear();

        // Adiciona os novos itens
        for (ItemRequest itemDto : pedidoUpdateRequest.itensPedido()) {
            Produto produto = produtoRepository.findById(itemDto.produtoId())
                    .orElseThrow(() -> new NoSuchElementException(
                            "Produto não encontrado com o ID: " + itemDto.produtoId()));

            ItemPedido novoItem = new ItemPedido(pedido, produto, itemDto.quantidade());
            pedido.adicionarItem(novoItem);
        }

        Pedido pedidoAtualizado = pedidoRepository.save(pedido);
        return new PedidoResponse(pedidoAtualizado);
    }

    @Override
    @Transactional
    public void cancelarMeuPedido(Long pedidoId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new NoSuchElementException("Pedido não encontrado com o ID: " + pedidoId));

        pedido.setStatus(ItemStatus.INATIVO);
        pedidoRepository.save(pedido);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PedidoResponse> listarMeusPedidos(Long clienteId) {
        // Valida se o cliente existe
        if (!clienteRepository.existsById(clienteId)) {
            throw new NoSuchElementException("Cliente não encontrado com o ID: " + clienteId);
        }

        // Busca todos os pedidos e filtra na aplicação.
        // Para otimizar, o ideal seria criar um método no PedidoRepository:
        // `findAllByClienteId(Long clienteId)`
        return pedidoRepository.findAll().stream()
                .filter(pedido -> pedido.getCliente().getId().equals(clienteId)
                        && pedido.getStatus() == ItemStatus.ATIVO)
                .map(PedidoResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PedidoResponse obterMeuPedidoPorId(Long pedidoId, Long clienteId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new NoSuchElementException("Pedido não encontrado com o ID: " + pedidoId));

        // Validação para garantir que o cliente só possa ver seu próprio pedido
        if (!pedido.getCliente().getId().equals(clienteId)) {
            throw new SecurityException("Acesso negado: Este pedido não pertence ao cliente informado.");
        }

        return new PedidoResponse(pedido);
    }
}