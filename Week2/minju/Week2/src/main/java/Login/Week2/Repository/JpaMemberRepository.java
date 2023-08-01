package Login.Week2.Repository;

import Login.Week2.domain.Member;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaMemberRepository implements MemberRepository {
    private final EntityManager em; //라이브러리에 Jpa 받았으면, 스프링이 자동으로 EntityManer 객체를 생성해줌. 그래서 걍 주입받음 됨

    public JpaMemberRepository(EntityManager em) { //JDBC 에서 배운 datasource를 다 들고있음
        this.em = em;
    }

    @Override
    public Member save(Member member) { //jpa가 insertquery 다 만들어주고, id까지 다 알아서 만들어줌
        em.persist(member);
        return member;
    }

    @Override
    public Optional<Member> findById(Long id) {
        Member member = em.find(Member.class, id);
        return Optional.ofNullable(member);
    }

    @Override
    public Optional<Member> findByName(String name) {
        List<Member> result = em.createQuery("select m from Member m where m.name = :name", Member.class)
                .setParameter("name", name)
                .getResultList();

        return result.stream().findAny();
    }

    @Override
    public List<Member> findAll() {
        return em.createQuery("select m from Member m", Member.class) //selcet가 Member 객체 자체를 선택함. 그래서 select m
                .getResultList();
    }
}
