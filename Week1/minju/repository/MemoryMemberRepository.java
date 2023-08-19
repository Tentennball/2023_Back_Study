package hello.hellospring.repository;

import hello.hellospring.domain.Member;
import org.springframework.stereotype.Repository;

import java.util.*;

//@Repository //스프링이 시작될 때,
public class MemoryMemberRepository implements MemberRepository  {

    private static Map<Long, Member> store = new HashMap<>();
    private static long sequence = 0L; //0,1,2 처럼 그냥 키 값을 생성해주는 코드임
    @Override
    public Member save(Member member) {
        member.setId(++sequence);
        store.put(member.getId(), member);
        return member;
    }

    @Override
    public Optional<Member> findById(Long id) {
        return Optional.ofNullable(store.get(id)); //Optional.ofNullable()는 null을 반환하게 되더라도 클라이언트에서 처리 가능
    }

    @Override
    public Optional<Member> findByEmail(String email) {
        return store.values().stream()
                .filter(member->member.getEmail().equals(email))
                .findAny();
    }

    @Override
    public List<Member> findAll() {
        return new ArrayList<>(store.values());

    }

    public void clearStore(){
        store.clear();
    }
}
