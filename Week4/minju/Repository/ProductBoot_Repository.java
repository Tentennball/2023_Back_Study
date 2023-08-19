package week4.tosspayments.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import week4.tosspayments.Entity.Product;

import java.util.Optional;

public interface ProductBoot_Repository extends JpaRepository<Product, Long>, ProductRepository{

}
