package week3.seed.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import week3.seed.Domain.User;

import java.util.List;

public interface SpringJpaUsersRepository extends JpaRepository<User, Long>, UserRepository{
    @Query(value = "SELECT Id FROM user", nativeQuery = true)
    List<String> findAllId();
}
