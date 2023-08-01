package hello.hellospring.service;

import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemberRepository;
import hello.hellospring.repository.MemoryMemberRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

class MemberServiceTest {
    MemberService memberService;
    MemoryMemberRepository memberRepository;

    @BeforeEach //테스트 실행 전 항상 동작
    public void beforeEach(){
        memberRepository = new MemoryMemberRepository(); //MemberService와 같은 DB가 사용될 수 있음. 즉 서로 다른 인스턴스가 아님
                                                         //new 연산자를 사용했다면 MemberService의 인스턴스와는 별개로 만들어지기에,
                                                        //어떤 정보가 들어있든 정보 교환이 안 될 것
        memberService = new MemberService(memberRepository);
    }

    @AfterEach //테스트 실행 후 항상 동작
    public void afterEach(){
        memberRepository.clearStore(); //DB의 값을 다 날려줌
                                       //이 기능을 구현해주지 않으면 void 회원가입에서 setName으로 넣어준 spring과, void 중복회원예외에서 member1으로
                                       //넣은 spring이 부딪치는 상황이 생김. 이 기능으로 매 테스트마다 db를 지워줘서 해당 오류를 방지할 수 있음
    }


    @Test
    void 회원가입() { //test는 한글로도 많이 적음 / 빌드될 때 실제 코드에 포함도 안됨
        //given - 뭔가가 주어졌을 때
        Member member = new Member();
        member.setEmail("spring");

        //when - 이걸 실행했을 때
        Long saveId = memberService.join(member);

        //then - 결과가 이게 나와야 한다
        Member findeMember = memberService.findOne(saveId).get();
        assertThat(member.getEmail()).isEqualTo(findeMember.getEmail());
    }

    @Test
    public void 중복_회원_예외(){
        //given
        Member member1 = new Member();
        member1. setEmail("spring");

        Member member2 = new Member();
        member2.setEmail("spring");

       //when
       memberService.join(member1);
        IllegalStateException e = assertThrows(IllegalStateException.class, () -> memberService.join(member2));
        // 밑의 try-catch 부분을 쉽게 축약한 메서드, 화살표 함수에 해당하는 부분을 실행시키면 해당 오류가 동작해야 한다는 의미임

        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
        //위에서 반환값을 e가 받고, 해당 e의 메시지가 우리가 설정해준 회원이 겹쳤을 때의 메시지와 동일한지 확인

/*         try {
            memberService.join(member2);
            fail();
        }catch (IllegalStateException e) {
            assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
        }
*/
        //then
    }

    @Test
    void findMembers() {
    }

    @Test
    void findOne() {
    }
}