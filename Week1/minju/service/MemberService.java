package hello.hellospring.service;

import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemberRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

//@Service //이게 있으면 해당 자바 코드가 스프링에 올라올 때, 스프링이 스프링컨테이너에 해당 코드,
         // 즉 여기선 MemberService를 "등록"함 -> 해당 생성자 함수 불러옴
         //-> 그런데 MemberServic 생성자 함수는 memberRepository 필요 (@Aurowired 통해 알 수 있음)
         //memberRepository의 구현체는 MemoryMemberRepository -> 이걸 MemberService에 넣어줌

//@Service
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
    public Long join(Member member) {

        validateDuplicateMember(member); //중복 회원 검증 -> 핵심 비즈니스 로직임
        memberRepository.save(member);
        return member.getId();
    }
    private void validateDuplicateMember(Member member) { //해당 멤버가 존재하는지 확인해주는 메서드
        memberRepository.findByEmail(member.getEmail())
                .ifPresent(m -> { //'result에 null 이 아닌 이미 값이 있다면'인 의미의 코드
                    //result라는 객체가 Optional이라는 것에 감싸져 있어서 그런거임(Optional의 메서드라 생각)
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }

    public String getEmailFromMemberId(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElse(null);

        if (member != null) {
            return member.getEmail();
        } else {
            return "회원 정보를 찾을 수 없습니다.";
        }
    }

    public Optional<Member> login(String email, String password) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member == null || !member.getClass().equals(password)) {
            return null; // 로그인 실패 시 null 반환
        }
        return member; // 로그인 성공 시 해당 멤버 반환
    }

    public List<Member> findMembers() {
       return memberRepository.findAll();
    }

    public Optional <Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }

}
