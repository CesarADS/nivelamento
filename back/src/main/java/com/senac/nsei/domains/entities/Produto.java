package com.senac.nsei.domains.entities;

import com.senac.nsei.application.dtos.produto.ProdutoSalvarRequest;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private Double preco;
    private String status;

    @OneToOne
    private Empresa empresa;

    public Produto(ProdutoSalvarRequest produto) {
        this.nome = produto.nome();
        this.descricao = produto.descricao();
        this.preco = produto.preco();
    }

}
