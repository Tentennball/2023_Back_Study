package week4.tosspayments.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import week4.tosspayments.Domain.DomainLogin;
import week4.tosspayments.Entity.User;
import week4.tosspayments.Service.MemberService;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@Controller
public class LoginController {

    private MemberService memberService;

    public LoginController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("login")
    public String loginPage() {
        return "login";
    }

    @PostMapping("/login")
    public ModelAndView loginInfo(@ModelAttribute DomainLogin domainLogin, HttpSession session) {
        try {
            //domain_user에 담았던 내용 entity, 즉 db 테이블에 저장하기
            Optional<User> user = memberService.login(domainLogin.getEmail(), domainLogin.getPassword());
            //session에도 해당 값 저장하기
            session.setAttribute("userEmail", domainLogin.getEmail());

            RedirectView redirectView = new RedirectView("/store");
            return new ModelAndView(redirectView);
        } catch (IllegalStateException e) {
            e.printStackTrace();
            return new ModelAndView("error"); // error 발생 페이지로 이동
        }
    }
}


//    @PostMapping("/login")
//    public ResponseEntity<String> loginInfo(@ModelAttribute String email, String password){
//
//        try {
//            //domain_user에 담았던 내용 entity, 즉 db 테이블에 저장하기
//
//            Optional<User> user = memberService.login(email,password);
//
//            return ResponseEntity.ok("로그인이 완료되었습니다." + user.get());
//        } catch (IllegalStateException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

    /*
   첫 번째 방법은 객체 지향적인 관점을 강조하며, 폼 데이터를 도메인 객체로 바인딩하여 데이터 관리와 검증을 편리하게 할 수 있습니다.
   두 번째 방법은 더 직접적으로 폼 데이터를 파라미터로 받아와 사용하는 방법이며, 간결한 코드를 선호하는 개발자에게 더 적합할 수 있습니다.
    */


