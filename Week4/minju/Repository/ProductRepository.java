package week4.tosspayments.Repository;

import week4.tosspayments.Entity.Product;
import week4.tosspayments.Entity.User;

import java.util.Optional;

public interface ProductRepository {
    Product save(Product product);
    Optional<Product> findByProductName(String ProductName);
}
