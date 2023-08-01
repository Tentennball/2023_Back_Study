package Login.Week2.Service;

import Login.Week2.Repository.MemberRepository;
import Login.Week2.domain.Member;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional //jpa는 모든 트랜젝션이 다 이 코드 내에서 수행되어야 함
public class MemberService {
    private final MemberRepository memberRepository;
    //@Autowired //이 코드로 인해 이미 컨테이너에 등록된 MemberService는 MemberRepository가 필요하구나, 하면서 MemberRepository 가져옴
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository; //멤버리파지터리를 외부에서 넣어줌 -> 같은 인스턴스를 공유함
        // -> DI(Dependency Injection) 라고 함(외부에서 주입된 객체에 의존한단 뜻)
    }

    /**
     * 회원 가입
     */
    public Long join(Member member) { //AOP - 각 시스템별 동작 시간을 재는 것

        validateDuplicateMember(member); //중복 회원 검증 -> 핵심 비즈니스 로직임
        memberRepository.save(member);
        return member.getId();
    }
    private void validateDuplicateMember(Member member) { //해당 멤버가 존재하는지 확인해주는 메서드
        memberRepository.findByName(member.getName())
                .ifPresent(m -> { //'result에 null 이 아닌 이미 값이 있다면'인 의미의 코드
                    //result라는 객체가 Optional이라는 것에 감싸져 있어서 그런거임(Optional의 메서드라 생각)
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }

}

