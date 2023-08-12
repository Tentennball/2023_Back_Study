package week4.tosspayments.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import week4.tosspayments.Entity.History;
import week4.tosspayments.Entity.User;

public interface HistoryBoot_Repository extends JpaRepository<History, Long>, HistoryRepository{
}
