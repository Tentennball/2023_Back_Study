package week4.tosspayments.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import week4.tosspayments.Domain.DomainUser;
import week4.tosspayments.Entity.User;
import week4.tosspayments.Service.MemberService;

@Controller
public class MemberShipController {
    private MemberService memberService;

    //DI! 생성자 주입이란 방식으로 MemberService 코드와 MemberController 코드를 연결시켜주는 부분임.
    @Autowired //스프링 시작되면 @Controller 동작 시킴, 그 때 생성자에 Autowired가 연결되어 있으면 스프링컨테이너에서 MemberService를 가져와 연결 시켜줌
    public MemberShipController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/membership")
    public String login_home() {
        return "membership";
    }

    @PostMapping("/membership")
    public ResponseEntity<String> loginInfo(@ModelAttribute DomainUser Domain_user) { //웹에서 post 한 값 domain_user 에 담기
        try {
            //domain_user에 담았던 내용 entity, 즉 db 테이블에 저장하기
            User user = new User();
            user.setEmail(Domain_user.getEmail()); //이메일로 중복검사
            user.setName(Domain_user.getName());
            user.setPassword(Domain_user.getPassword());
            user.setPhoneNumber(Domain_user.getPhoneNumber());

            Long memberId = memberService.join(user);

            return ResponseEntity.ok("회원 가입이 완료되었습니다. 회원 ID: " + memberId);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

