package com.senac.nsei.infra.persistence.converters;

import com.senac.nsei.domains.valueobjects.CPF;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class CpfConverter implements AttributeConverter<CPF, String> {

    /**
     * Converte o objeto CPF em uma String para ser salva no banco.
     * 
     * @param cpf o objeto de valor CPF
     * @return uma String com os 11 dígitos do CPF, ou null.
     */
    @Override
    public String convertToDatabaseColumn(CPF cpf) {
        if (cpf == null) {
            return null;
        }
        return cpf.getNumero();
    }

    /**
     * Converte a String do banco de dados de volta para um objeto CPF.
     * 
     * @param dbData a String vinda da coluna do banco (ex: "12345678901")
     * @return um objeto CPF, ou null.
     */
    @Override
    public CPF convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }
        return new CPF(dbData);
    }
}