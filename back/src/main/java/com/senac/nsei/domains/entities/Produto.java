package com.senac.nsei.domains.entities;

import com.senac.nsei.application.dtos.produto.ProdutoSalvarRequest;
import com.senac.nsei.enums.ItemStatus;

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

    @Column(unique = true, nullable = false)
    private String nome;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private Double preco;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ItemStatus status;

    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;

    public Produto(String nome, String descricao, Double preco, ItemStatus status, Empresa empresa) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.status = status;
        this.empresa = empresa;
    }


}
