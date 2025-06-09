package com.senac.nsei.application.services;

import com.senac.nsei.application.dtos.produto.ProdutoResponse;
import com.senac.nsei.application.dtos.produto.ProdutoSalvarRequest;
import com.senac.nsei.application.services.interfaces.IProdutoService;
import com.senac.nsei.domains.entities.Empresa;
import com.senac.nsei.domains.entities.Produto;
import com.senac.nsei.domains.entities.Vendedor;
import com.senac.nsei.domains.repositorys.ProdutoRepository;
import com.senac.nsei.domains.repositorys.VendedorRepository;
import com.senac.nsei.enums.ItemStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class ProdutoService implements IProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private VendedorRepository vendedorRepository;

    @Override
    @Transactional
    public ProdutoResponse criarProduto(ProdutoSalvarRequest produtoSalvarRequest, Long vendedorId) {
        // Busca o vendedor para associar o produto à sua empresa
        Vendedor vendedor = vendedorRepository.findById(vendedorId)
                .orElseThrow(() -> new NoSuchElementException("Vendedor não encontrado com o ID: " + vendedorId));

        Empresa empresaDoVendedor = vendedor.getEmpresa();

        Produto novoProduto = new Produto(
                produtoSalvarRequest.nome(),
                produtoSalvarRequest.descricao(),
                produtoSalvarRequest.preco(),
                ItemStatus.ATIVO, // Todo novo produto começa como ATIVO
                empresaDoVendedor);

        Produto produtoSalvo = produtoRepository.save(novoProduto);

        return new ProdutoResponse(produtoSalvo);
    }

    // Adicionar este método dentro da classe ProdutoService

    @Override
    @Transactional(readOnly = true)
    public List<ProdutoResponse> listarTodosProdutosParaCatalogo() {
        // Chama o novo método eficiente do repositório
        List<Produto> produtosAtivos = produtoRepository.findAllAtivosDeVendedoresAtivos(ItemStatus.ATIVO);

        // Mapeia para a resposta
        return produtosAtivos.stream()
                .map(ProdutoResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ProdutoResponse atualizarProduto(Long produtoId, ProdutoSalvarRequest produtoSalvarRequest) {
        // A validação de que o vendedor logado é o "dono" do produto deve ser feita no
        // Controller
        // antes de chamar este método, para garantir a segurança.

        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new NoSuchElementException("Produto não encontrado com o ID: " + produtoId));

        produto.setNome(produtoSalvarRequest.nome());
        produto.setDescricao(produtoSalvarRequest.descricao());
        produto.setPreco(produtoSalvarRequest.preco());

        Produto produtoAtualizado = produtoRepository.save(produto);

        return new ProdutoResponse(produtoAtualizado);
    }

    @Override
    @Transactional
    public void inativarProduto(Long produtoId) {
        // A validação de que o vendedor logado é o "dono" do produto deve ser feita no
        // Controller.

        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new NoSuchElementException("Produto não encontrado com o ID: " + produtoId));

        produto.setStatus(ItemStatus.INATIVO);
        produtoRepository.save(produto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProdutoResponse> listarMeusProdutos(Long vendedorId) {
        if (!vendedorRepository.existsById(vendedorId)) {
            throw new NoSuchElementException("Vendedor não encontrado com o ID: " + vendedorId);
        }

        // O ideal seria um método em ProdutoRepository:
        // `findAllByEmpresaVendedorIdAndStatus`
        return produtoRepository.findAll().stream()
                .filter(p -> p.getEmpresa().getVendedor().getId().equals(vendedorId)
                        && p.getStatus() == ItemStatus.ATIVO)
                .map(ProdutoResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProdutoResponse obterProdutoPorId(Long produtoId) {
        Produto produto = produtoRepository.findById(produtoId)
                .filter(p -> p.getStatus() == ItemStatus.ATIVO) // Garante que apenas produtos ativos sejam retornados
                .orElseThrow(() -> new NoSuchElementException("Produto ativo não encontrado com o ID: " + produtoId));

        return new ProdutoResponse(produto);
    }
}