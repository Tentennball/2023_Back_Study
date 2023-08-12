package week4.tosspayments.Repository;

import week4.tosspayments.Entity.History;
import week4.tosspayments.Entity.Product;
import week4.tosspayments.Entity.User;

import java.util.Optional;

public interface HistoryRepository {
    History save(History history);
    Optional<History> findById(Long id);
}
