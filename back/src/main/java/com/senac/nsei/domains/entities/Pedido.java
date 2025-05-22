package com.senac.nsei.domains.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.senac.nsei.application.dtos.item.ItemResponse;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @OneToMany(
            mappedBy = "pedido",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<ItemPedido> itens = new ArrayList<>();

    private Double valorTotal;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Temporal(TemporalType.DATE)
    private Date data;

    private String status;

    @OneToOne
    private Empresa empresa;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_cliente_id")
    private Usuario cliente;

    public void calcularValorTotal() {

        if (this.itens == null) {
            this.valorTotal = 0.0;
            return;
        }

        this.valorTotal = this.itens.stream()
                .filter(Objects::nonNull)
                .filter(item -> item.getQuantidade() != null && item.getPrecoUnitario() != null)
                .mapToDouble(item -> item.getQuantidade() * item.getPrecoUnitario())
                .sum();
    }

    // Garante que o valor total seja calculado/atualizado antes de salvar/atualizar
    @PrePersist
    @PreUpdate
    public void onPrePersistOrUpdate() {
        calcularValorTotal();
    }

    @Override
    public String toString() {

        return this.itens.stream()

                .filter(Objects::nonNull)
                .map(item -> {
                    String nome = item.getPedido().getNome();
                    Integer quantidade = item.getQuantidade();
                    String quantidadeStr;

                    quantidadeStr = quantidade + " UN";

                    // Retorna a string formatada para este item
                    return nome + " (" + quantidadeStr + ")";
                })


                .collect(Collectors.joining(", "));

    }

    public List<ItemResponse> toList() {

        return this.itens.stream()
                .filter(Objects::nonNull)
                .map(item -> {
                    String nome = item.getProduto().getNome();
                    Integer quantidade = item.getQuantidade();
                    Double preoUnitario = item.getPrecoUnitario();
                    return new ItemResponse(nome, quantidade, preoUnitario);
                })
                .collect(Collectors.toList());

    }

}

