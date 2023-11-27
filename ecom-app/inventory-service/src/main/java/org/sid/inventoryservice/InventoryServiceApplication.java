package org.sid.inventoryservice;

import org.sid.inventoryservice.entities.Product;
import org.sid.inventoryservice.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.List;

@SpringBootApplication
public class InventoryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InventoryServiceApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(ProductRepository productRepository,
											   RepositoryRestConfiguration repositoryRestConfiguration) {
		return args -> {
			//pour exposer les id des entités dans le service REST
			repositoryRestConfiguration.exposeIdsFor(Product.class);
			productRepository.saveAll(
					List.of(
							Product.builder().name("Ord HP 879").price(6000).quantity(12).build(),
							Product.builder().name("Imprimante Epson").price(1000).quantity(20).build(),
							Product.builder().name("Smartphone Samsung").price(3000).quantity(15).build()
					)
			);
			productRepository.findAll().forEach(c->{
				System.out.println(c.toString());
			});
		};
	}
}
