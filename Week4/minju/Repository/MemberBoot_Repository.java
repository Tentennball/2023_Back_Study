package week4.tosspayments.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import week4.tosspayments.Entity.User;

import java.util.Optional;

public interface MemberBoot_Repository extends JpaRepository<User, Long>, MemberRepository {
    @Override
    Optional<User> findByEmail(String email); //해당 함수는 jpa에서 따로 정의하고 있지 않기에 오버라이딩 필요.
}
