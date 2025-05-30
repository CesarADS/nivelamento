package com.senac.nsei.domains.valueobjects;

public class CNPJ {

    private String cnpj;

    public CNPJ() {
        this.cnpj = "";
    }

    public CNPJ(String cnpj) {
        if (cnpj == null || !isValid(cnpj)) {
            throw new IllegalArgumentException("CNPJ Inválido");
        }
        this.cnpj = cnpj;
    }

    public String getNumero() {
        return cnpj;
    }

    private boolean isValid(String cnpj) {
        String cnpjNumeros = cnpj.replaceAll("[^0-9]", "");

        if (cnpjNumeros.length() != 14 || cnpjNumeros.matches("(\\d)\\1{13}")) {
            return false;
        }

        return validarDigitosVerificadores(cnpjNumeros);
    }

    private boolean validarDigitosVerificadores(String cnpj) {
        // Cálculo do primeiro dígito verificador
        int soma = 0;
        int peso = 5;
        for (int i = 0; i < 12; i++) {
            soma += (cnpj.charAt(i) - '0') * peso;
            peso--;
            if (peso < 2) {
                peso = 9;
            }
        }
        int resto = soma % 11;
        int primeiroDigito = (resto < 2) ? 0 : 11 - resto;

        if (primeiroDigito != (cnpj.charAt(12) - '0')) {
            return false;
        }

        // Cálculo do segundo dígito verificador
        soma = 0;
        peso = 6;
        for (int i = 0; i < 13; i++) {
            soma += (cnpj.charAt(i) - '0') * peso;
            peso--;
            if (peso < 2) {
                peso = 9;
            }
        }
        resto = soma % 11;
        int segundoDigito = (resto < 2) ? 0 : 11 - resto;

        return segundoDigito == (cnpj.charAt(13) - '0');
    }

    @Override
    public String toString() {
        return this.cnpj;
    }
}