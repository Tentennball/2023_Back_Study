package week3.seed.Repository;

import org.springframework.data.jpa.repository.Query;
import week3.seed.Domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    User save(User user);

}
