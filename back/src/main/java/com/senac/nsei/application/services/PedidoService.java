package com.senac.nsei.application.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
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
        Pedido novoPedido = PedidoSalvarRequestToPedido(pedido, null);
        pedidoRepository.save(novoPedido);
        return new PedidoResponse(novoPedido);
    }

    @Override
    public PedidoResponse buscarPedidoPorId(Long id) {
        return pedidoRepository.findById(id).map(PedidoResponse::new).orElse(null);
    }

    @Override
    public PedidoResponse editarPedido(Long id, PedidoSalvarRequest pedido) {

        Pedido pedidoExistente = pedidoRepository.findById(id).get();
        Pedido pedidoAtualizado = PedidoSalvarRequestToPedido(pedido, pedidoExistente);
        pedidoRepository.save(pedidoAtualizado);
        return new PedidoResponse(pedidoAtualizado);

    }

    @Override
    public List<PedidoResponse> listarPedidos() {
        return pedidoRepository.findAll().stream().map(PedidoResponse::new).toList();
    }

    @Override
    public String toString(Long id) {
        return pedidoRepository.findById(id).get().toString();
    }
    
    private Pedido PedidoSalvarRequestToPedido(PedidoSalvarRequest request, Pedido pedidoExistente) {

        Pedido pedidoParaSalvar = pedidoExistente != null ? pedidoExistente : new Pedido();

        pedidoParaSalvar.setNome(request.nome());

        // Se for um novo pedido, define status e data
        if (pedidoExistente == null) {
            pedidoParaSalvar.setStatus("Ativo");
        }

        pedidoParaSalvar.setData(new Date());

        // Limpa itens existentes para o caso de edição, para evitar duplicatas ou itens
        // órfãos
        // Se a lógica de negócio permitir adicionar/remover itens individualmente, essa
        // parte precisaria ser mais elaborada.
        // Por simplicidade, aqui estamos substituindo todos os itens.
        if (pedidoParaSalvar.getItens() != null) {
            pedidoParaSalvar.getItens().clear();
        }

        List<ItemPedido> novosItens = request.itensPedido().stream().map(itemDto -> {
            
            Optional<Produto> produtoOpt = produtoRepository.findById(itemDto.produtoId());
            
            Produto produto = produtoOpt.get();

            var lItem = new ItemPedido();
            lItem.setPedido(pedidoParaSalvar);
            lItem.setProduto(produto);
            lItem.setQuantidade(itemDto.quantidade());
            lItem.setPrecoUnitario(produto.getPreco());
            return lItem;
        }).collect(Collectors.toList());

        pedidoParaSalvar.setItens(novosItens);
        return pedidoParaSalvar;
    }

}
