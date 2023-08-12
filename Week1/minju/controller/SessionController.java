package hello.hellospring.controller;


import hello.hellospring.domain.Member;
import hello.hellospring.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/v1/login")
public class SessionController {

    private MemberService memberService;

    //DI! 생성자 주입이란 방식으로 MemberService 코드와 MemberController 코드를 연결시켜주는 부분임.
    @Autowired //스프링 시작되면 @Controller 동작 시킴, 그 때 생성자에 Autowired가 연결되어 있으면 스프링컨테이너에서 MemberService를 가져와 연결 시켜줌
    public SessionController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/sessionLogin")
    public ResponseEntity<String> create(@RequestBody MemberForm form, HttpSession httpSession) {
        try {
            Member member = new Member();
            member.setEmail(form.getEmail());
            member.setPassword(form.getPassword());
            Long memberId = memberService.join(member);

            // 회원 가입이 완료되면, 세션에 회원 ID를 저장합니다.
            httpSession.setAttribute("loggedInMemberId", memberId);

            return ResponseEntity.ok("회원 가입이 완료되었습니다. 회원 ID: " + memberId);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/sessionVerify")
    public ResponseEntity<String> getEmailFromSession(@RequestBody Session_IdForm request, HttpSession httpSession) {
        try {
            // 요청에서 제공된 session_id 값을 가져옵니다.
            String sessionId = request.getSession_Id();

            // 세션에 저장된 회원 ID를 가져옵니다.
            Long loggedInMemberId = (Long) httpSession.getAttribute("loggedInMemberId");
            if (loggedInMemberId != null && sessionId.equals(httpSession.getId())) {
                // 회원 ID를 이용하여 중복 검증된 이메일을 가져옵니다.
                String email = memberService.getEmailFromMemberId(loggedInMemberId);
                return ResponseEntity.ok("이메일: " + email);
            } else {
                return ResponseEntity.badRequest().body("세션이 없거나 올바르지 않은 세션입니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 에러 발생");
        }
    }
}
