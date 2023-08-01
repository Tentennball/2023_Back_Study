package hello.hellospring.repository;

import com.fasterxml.jackson.annotation.OptBoolean;
import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemberRepository;
import hello.hellospring.repository.MemoryMemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

class MemoryMemberRepositoryTest {
    MemoryMemberRepository repository = new MemoryMemberRepository();
    @AfterEach
    public void afterEach(){
        repository.clearStore();
    } //각 test가 끝날 때 마다 해당 저장소를 지워주는 함수임
    //이 클래스를 한 번에 돌릴 때는

    @Test
    public void save(){
        Member member = new Member();
        member.setEmail("spring");

        repository.save(member);

        Member result = repository.findById(member.getId()).get();
        assertThat(member).isEqualTo(result);

    }

    @Test
    public void findByName(){
        Member member1 = new Member();
        member1.setEmail("spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setEmail("spring2");
        repository.save(member2);

        Member result = repository.findByEmail("spring1").get();

        assertThat(result).isEqualTo(member1);
    }

    @Test
    public void findAll(){
        Member member1 = new Member();
        member1.setEmail("spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setEmail("spring2");
        repository.save(member2);

        List<Member> result = repository.findAll();

        assertThat(result.size()).isEqualTo(2);

    }
}


