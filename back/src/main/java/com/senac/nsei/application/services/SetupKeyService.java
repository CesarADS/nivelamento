package com.senac.nsei.application.services;

import com.senac.nsei.domains.repositorys.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SetupKeyService {

    @Autowired
    private AdministradorRepository administradorRepository;

    private String setupKey = null;

    // Este método roda assim que a aplicação está pronta
    @EventListener(ApplicationReadyEvent.class)
    public void generateSetupKeyOnStartup() {
        if (administradorRepository.count() == 0) {
            this.setupKey = UUID.randomUUID().toString();
            System.out.println("====================================================================");
            System.out.println("ATENÇÃO: Nenhum administrador encontrado. Use a chave abaixo na sua");
            System.out.println("aplicação Desktop para criar o primeiro usuário administrador:");
            System.out.println("CHAVE DE CONFIGURAÇÃO: " + this.setupKey);
            System.out.println("====================================================================");
        }
    }

    public boolean isKeyValid(String key) {
        return this.setupKey != null && this.setupKey.equals(key);
    }

    public void invalidateKey() {
        this.setupKey = null;
    }
}