package week4.tosspayments.Service;

import org.springframework.stereotype.Service;
import week4.tosspayments.Entity.User;
import week4.tosspayments.Repository.MemberRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Long join(User user) {
        validateDuplicateMember(user); //중복 회원 검증 -> 핵심 비즈니스 로직임
        memberRepository.save(user);
        return user.getId();
    }

    private void validateDuplicateMember(User user) { //해당 멤버가 존재하는지 확인해주는 메서드
        memberRepository.findByEmail(user.getEmail())
                .ifPresent(m -> { //'result에 null 이 아닌 이미 값이 있다면'인 의미의 코드
                    //result라는 객체가 Optional이라는 것에 감싸져 있어서 그런거임(Optional의 메서드라 생각)
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }


    public Optional<User> login(String email, String password) {
        Optional<User> user = memberRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user; // 로그인 성공 시 해당 멤버 반환
        } else {
            return Optional.empty(); // 로그인 실패 시 빈 Optional 반환
        }
    }

    public String getNameFromMemberEmail(String email) {
        User user = memberRepository.findByEmail(email)
                .orElse(null);

        if (user != null) {
            return user.getName();
        } else {
            return "회원 정보를 찾을 수 없습니다.";
        }
    }


    public List<User> findMembers() {
        return memberRepository.findAll();
    }

    public Optional <User> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }

}
