package com.senac.nsei.domains.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@Entity
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

    public void addItem(ItemPedido item) {
        this.itens.add(item);
        item.setPedido(this);
    }

    public void removeItem(ItemPedido item) {
        this.itens.remove(item);
        item.setPedido(null); // Remove a referência bidirecional
    }

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
}

