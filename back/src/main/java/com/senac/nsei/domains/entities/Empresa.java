package com.senac.nsei.domains.entities;

import com.senac.nsei.domains.valueobjects.CNPJ;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Entity
@Table(name = "empresas")
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cnpj", length = 14, nullable = false, unique = true)
    private CNPJ cnpj;

    @Column(nullable = false)
    private String razaoSocial;

    private String nomeFantasia;

    @OneToOne(mappedBy = "empresa")
    private Vendedor vendedor;

    public Empresa(CNPJ cnpj, String razaoSocial, String nomeFantasia) {
        this.cnpj = cnpj;
        this.razaoSocial = razaoSocial;
        this.nomeFantasia = nomeFantasia;
    }

    
}