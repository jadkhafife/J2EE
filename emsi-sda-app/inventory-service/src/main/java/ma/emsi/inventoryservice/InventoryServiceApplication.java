package ma.emsi.inventoryservice;

import ma.emsi.inventoryservice.entities.Product;
import ma.emsi.inventoryservice.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.UUID;

@SpringBootApplication
public class InventoryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(ProductRepository productRepository){
        return args -> {
            productRepository.save(Product.builder().id(UUID.randomUUID().toString()).name("Computer").price(1000).quantity(12).build());
            productRepository.save(Product.builder().id(UUID.randomUUID().toString()).name("Printer").price(100).quantity(120).build());
            productRepository.save(Product.builder().id(UUID.randomUUID().toString()).name("Phone").price(2000).quantity(10).build());
        };
    }
}
