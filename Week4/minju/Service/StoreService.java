package week4.tosspayments.Service;

import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import week4.tosspayments.Entity.Product;
import week4.tosspayments.Repository.ProductBoot_Repository;
import week4.tosspayments.Repository.ProductRepository;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class StoreService {

    @Autowired
    private ProductRepository productrepository;

    @Autowired
    private ProductBoot_Repository productBoot_repository;

    public StoreService(ProductRepository productrepository, ProductBoot_Repository productBoot_repository) {
        this.productrepository = productrepository;
        this.productBoot_repository = productBoot_repository;
    }

    public List<Product> createProduct(int seed) {
        Faker faker = new Faker(new Locale("en"), new Random(seed));
        List<Product> Products = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            Currency krwCurrency = Currency.getInstance("KRW"); // 한국 원
            String price = krwCurrency.getSymbol() + " " + faker.number().numberBetween(100, 1000000); // 100원부터 1,000,000원 사이의 랜덤 가격 생성
            String seller = faker.name().fullName();
            String productName = faker.commerce().productName();

            Product product = new Product();
            product.setPrice(price);
            product.setSeller(seller);
            product.setProductName(productName);

            Products.add(product);
            productrepository.save(product);
        }
        return Products;
    }
}
