package com.senac.nsei;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class NseiApplication implements CommandLineRunner {

	private List<String> lista = new ArrayList<>();
	Scanner read = new Scanner(System.in);

	public static void main(String[] args) {
		SpringApplication.run(NseiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		lista.add("Item 1");
		lista.add("Item 2");
		lista.add("Item 3");

		int opcao = 0;

		while (opcao != 7) {
			System.out.print("\n\n\n\nDigite a opção desejada");
			System.out.println("\n\n1 - Listar");
			System.out.println("2 - Adicionar Item");
			System.out.println("7 - Sair");
			System.out.print("\nDigite a opção: ");
			opcao = read.nextInt();
			read.nextLine();

			if (opcao == 1) {
				listarLista();
			} else if (opcao == 2) {
				adicionarItem();
			} else if (opcao == 7) {
				System.out.println("\nSAINDO...");
			} else {
				System.out.println("\nDIGITE UMA OPÇÃO VÁLIDA!");
				Thread.sleep(2000);
			}

			System.out.print("\n------------------------------------");
		}
	}

	public void listarLista() {
		System.out.println();
		for (String item : lista) {
			System.out.println("--> " + item);
		}
	}

	public void adicionarItem() {
		System.out.print("\nDigite o item que deseja adicionar: ");
		String novoItem = read.nextLine();
		lista.add(novoItem);
		System.out.println("\nItem adicionado com sucesso!");
	}
}
