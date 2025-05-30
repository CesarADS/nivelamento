package com.senac.nsei.infra.persistence.converters;

import com.senac.nsei.domains.valueobjects.CNPJ;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class CnpjConverter implements AttributeConverter<CNPJ, String> {

    /**
     * Converte o objeto CNPJ para uma String para ser salva no banco.
     * 
     * @param cnpj o objeto de valor CNPJ
     * @return uma String com os 14 dígitos do CNPJ, ou null.
     */
    @Override
    public String convertToDatabaseColumn(CNPJ cnpj) {
        if (cnpj == null) {
            return null;
        }
        return cnpj.getNumero();
    }

    /**
     * Converte a String do banco de dados de volta para um objeto CNPJ.
     * 
     * @param dbData a String vinda da coluna do banco (ex: "12345678000190")
     * @return um objeto CNPJ, ou null.
     */
    @Override
    public CNPJ convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }
        return new CNPJ(dbData);
    }
}