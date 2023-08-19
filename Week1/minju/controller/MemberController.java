package hello.hellospring.controller;

import hello.hellospring.domain.Member;
import hello.hellospring.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
    public class MemberController {
        private MemberService memberService;

        //DI! 생성자 주입이란 방식으로 MemberService 코드와 MemberController 코드를 연결시켜주는 부분임.
        @Autowired //스프링 시작되면 @Controller 동작 시킴, 그 때 생성자에 Autowired가 연결되어 있으면 스프링컨테이너에서 MemberService를 가져와 연결 시켜줌
        public MemberController(MemberService memberService) {
            this.memberService = memberService;
        }

        @GetMapping("/v1/register") //해당 주소로 들어오면 밑의 코드와 연결이 됨. 즉 해당 html을 보여주는 것
        public String createForm(){
            return "members/createMemberForm";
        }

     @PostMapping("/v1/register")  public ResponseEntity<String> create(@RequestBody MemberForm form) {
         try {
             Member member = new Member();
             member.setEmail(form.getEmail());
             Long memberId = memberService.join(member);
             member.setPassword(form.getPassword());
             return ResponseEntity.ok("회원 가입이 완료되었습니다. 회원 ID: " + memberId);
         } catch (IllegalStateException e) {
             return ResponseEntity.badRequest().body(e.getMessage());
         }
     }
        @GetMapping("/members")
        public String List(Model model){
            List<Member> members = memberService.findMembers();
            model.addAttribute("members", members);
            return "members/memberList";
        }
}
