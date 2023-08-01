package hello.hellospring.repository;

import hello.hellospring.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SpringDataJpaMemoryRepository extends JpaRepository <Member, Long>, MemberRepository {
    //스프링데이터 JPA가 해당 Jparepository 인터페이스를 받는 인터페이스를 보고, 자동으로 스스로 구현체를 만들어 스프링 빈에 코드를 등록
    @Override
    Optional<Member> findByEmail(String email);

    @Override
    Optional<Member> findById(Long id);

}
