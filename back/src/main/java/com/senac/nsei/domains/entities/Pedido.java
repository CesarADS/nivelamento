package com.senac.nsei.domains.entities;

import com.senac.nsei.enums.ItemStatus;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @OneToMany(
            mappedBy = "pedido",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<ItemPedido> itens = new ArrayList<>();

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal valorTotal;

    @Column(nullable = false)
    private LocalDateTime dataPedido;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ItemStatus status;

    // Um pedido não pertence diretamente a uma empresa se ele pode ter produtos de várias.
    // A ligação com a empresa/vendedor vem através do ItemPedido -> Produto -> Empresa.

    public Pedido(Cliente cliente) {
        this.cliente = cliente;
        ZonedDateTime dataHoraComFuso = ZonedDateTime.now(ZoneId.of("America/Sao_Paulo"));
        this.dataPedido = dataHoraComFuso.toLocalDateTime();
        this.status = ItemStatus.ATIVO;
        this.valorTotal = BigDecimal.ZERO;
    }

    public void adicionarItem(ItemPedido item) {
        this.itens.add(item);
        item.setPedido(this); // Garante a relação bidirecional
        recalcularValorTotal();
    }

    // Garante que o valor total seja calculado/atualizado antes de salvar/atualizar
    public void removerItem(ItemPedido item) {
        this.itens.remove(item);
        item.setPedido(null);
        recalcularValorTotal();
    }

    public void recalcularValorTotal() {
        if (this.itens == null) {
            this.valorTotal = BigDecimal.ZERO;
            return;
        }
        this.valorTotal = this.itens.stream()
                .filter(Objects::nonNull)
                .map(ItemPedido::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // Garante que o valor total seja calculado/atualizado antes de salvar/atualizar
    @PrePersist
    @PreUpdate
    public void onPrePersistOrUpdate() {
        recalcularValorTotal();
    }

    

}

