package week4.tosspayments.Repository;

import week4.tosspayments.Entity.User;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    User save(User user);
    Optional<User> findById(Long id); //null 값 존재할 수 있으니 Optional 사용
    Optional<User> findByEmail(String email);
    List<User> findAll(); //하나의 객체를 찾아야 하므로 List 사용
}
