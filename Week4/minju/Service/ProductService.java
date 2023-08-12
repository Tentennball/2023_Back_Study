package week4.tosspayments.Service;

import org.springframework.stereotype.Service;
import week4.tosspayments.Entity.Product;
import week4.tosspayments.Entity.User;
import week4.tosspayments.Repository.MemberRepository;
import week4.tosspayments.Repository.ProductRepository;

import javax.transaction.Transactional;

@Service
@Transactional
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Long getProductIdFromProductName(String name) {
        Product product = productRepository.findByProductName(name)
                .orElse(null);

        if (product != null) {
            return product.getProduct_id();
        } else {
            return null;
        }
    }
}
