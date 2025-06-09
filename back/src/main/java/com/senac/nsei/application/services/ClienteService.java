package com.senac.nsei.application.services;

import com.senac.nsei.application.dtos.cliente.ClienteRequest;
import com.senac.nsei.application.dtos.cliente.ClienteResponse;
import com.senac.nsei.application.dtos.cliente.ClienteUpdateRequest;
import com.senac.nsei.application.services.interfaces.IClienteService;
import com.senac.nsei.domains.entities.Cliente;
import com.senac.nsei.domains.repositorys.ClienteRepository;
import com.senac.nsei.domains.repositorys.UsuarioRepository;
import com.senac.nsei.domains.valueobjects.CPF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
public class ClienteService implements IClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public ClienteResponse registrarCliente(ClienteRequest clienteRequest) {
        // Valida se já existe um usuário com o mesmo login
        if (usuarioRepository.findByLogin(clienteRequest.login()).isPresent()) {
            throw new IllegalArgumentException("Já existe um usuário com o login informado.");
        }

        // Cria o objeto de valor CPF
        CPF cpf = new CPF(clienteRequest.cpf());

        // Criptografa a senha antes de salvar
        String senhaCriptografada = passwordEncoder.encode(clienteRequest.senha());

        // Cria a entidade Cliente
        Cliente novoCliente = new Cliente(
                clienteRequest.login(),
                senhaCriptografada,
                clienteRequest.nomeCompleto(),
                clienteRequest.email(),
                cpf,
                clienteRequest.rua(),
                Integer.valueOf(clienteRequest.numero()),
                clienteRequest.bairro(),
                clienteRequest.cidade(),
                clienteRequest.estado(),
                clienteRequest.cep(),
                clienteRequest.telefone());

        // Salva o cliente no banco de dados
        Cliente clienteSalvo = clienteRepository.save(novoCliente);

        // Retorna o DTO de resposta
        return new ClienteResponse(clienteSalvo);
    }

    @Override
    @Transactional(readOnly = true)
    public ClienteResponse obterPerfil(Long clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new NoSuchElementException("Cliente não encontrado com o ID: " + clienteId));

                return new ClienteResponse(cliente);
    }

    @Override
    @Transactional
    public ClienteResponse atualizarPerfil(Long clienteId, ClienteUpdateRequest updateRequest) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new NoSuchElementException("Cliente não encontrado com o ID: " + clienteId));

        // Atualiza a senha se uma nova for fornecida
        if (updateRequest.senha() != null && !updateRequest.senha().isBlank()) {
            cliente.setPassword(passwordEncoder.encode(updateRequest.senha()));
        }

        // Atualiza os outros campos
        cliente.setTelefone(updateRequest.telefone());
        cliente.setNumero(Integer.valueOf(updateRequest.numero()));
        cliente.setRua(updateRequest.rua());
        cliente.setBairro(updateRequest.bairro());
        cliente.setCidade(updateRequest.cidade());
        cliente.setEstado(updateRequest.estado());
        cliente.setCep(updateRequest.cep());

        Cliente clienteAtualizado = clienteRepository.save(cliente);

        return new ClienteResponse(clienteAtualizado);
    }
}