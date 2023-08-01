//package hello.hellospring.service;
//
//import hello.hellospring.domain.Member;
//import hello.hellospring.repository.MemberRepository;
//import hello.hellospring.repository.MemoryMemberRepository;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Commit;
//
//import javax.transaction.Transactional;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//
//@SpringBootTest
//@Transactional
////db는 무조건 트랜젝션이란 개념이 있음
////db에 insertquery를 해준 다음 무조건 커밋을 해줘야 해당 db에 반영이 됨
//// => 이게 아니면 오토 커밋(자동 커밋)이란 개념도 있음.
//// 이 트랜젝션은 해당 테스트가 끝나면 db를 지워줌(사실 반영 자체를 안한다는 표현이 맞음)
//class MemberServiceIntegrationTest {
//    @Autowired
//    MemberService memberService; //테스트 케이스들은 그냥 땡겨와서 여기서 쓰고 끝이기에 이 애노테이션 쓰면 좋음
//    @Autowired
//    MemberRepository memberRepository;
//
//
//    @Test
//    //@Commit => 이 애노테이션 사용시, 실제 db에 반영됨
//    void 회원가입() { //test는 한글로도 많이 적음 / 빌드될 때 실제 코드에 포함도 안됨
//        //given - 뭔가가 주어졌을 때
//        Member member = new Member();
//        member.setName("spring457686");
//
//        //when - 이걸 실행했을 때
//        Long saveId = memberService.join(member);
//
//        //then - 결과가 이게 나와야 한다
//        Member findeMember = memberService.findOne(saveId).get();
//        assertThat(member.getName()).isEqualTo(findeMember.getName());
//    }
//
//    @Test
//    public void 중복_회원_예외() throws Exception {
//        //Given
//        Member member1 = new Member();
//        member1.setName("spring");
//        Member member2 = new Member();
//        member2.setName("spring");
//        //When
//        memberService.join(member1);
//        IllegalStateException e = assertThrows(IllegalStateException.class,
//                () -> memberService.join(member2));//예외가 발생해야 한다.
//        // 밑의 try-catch 부분을 쉽게 축약한 메서드, 화살표 함수에 해당하는 부분을 실행시키면 해당 오류가 동작해야 한다는 의미임
//        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
//    } //위에서 반환값을 e가 받고, 해당 e의 메시지가 우리가 설정해준 회원이 겹쳤을 때의 메시지와 동일한지 확인
//}
//

package hello.hellospring.service;
import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemberRepository;
import hello.hellospring.repository.SpringDataJpaMemoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
@SpringBootTest
@Transactional
class MemberServiceIntegrationTest {
    private final MemberService memberService;
    private final SpringDataJpaMemoryRepository memberRepository;

    @Autowired
    public MemberServiceIntegrationTest(MemberService memberService, SpringDataJpaMemoryRepository memberRepository) {
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }
    @Test
    public void 회원가입() throws Exception {
        //Given
        Member member = new Member();
        member.setEmail("hello");
        //When
        Long saveId = memberService.join(member);
        //Then
        Member findMember = memberRepository.findById(saveId).get();
        assertEquals(member.getEmail(), findMember.getEmail());
    }
    @Test
    public void 중복_회원_예외() throws Exception {
        //Given
        Member member1 = new Member();
        member1.setEmail("spring");
        Member member2 = new Member();
        member2.setEmail("spring");
        //When
        memberService.join(member1);
        IllegalStateException e = assertThrows(IllegalStateException.class,
                () -> memberService.join(member2));//예외가 발생해야 한다.
        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
    }
}