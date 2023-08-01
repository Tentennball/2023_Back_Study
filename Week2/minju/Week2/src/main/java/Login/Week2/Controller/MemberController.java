package Login.Week2.Controller;

import Login.Week2.Service.MemberService;
import Login.Week2.domain.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

public class MemberController {
    private MemberService memberService;

    @Autowired //스프링 시작되면 @Controller 동작 시킴, 그 때 생성자에 Autowired가 연결되어 있으면 스프링컨테이너에서 MemberService를 가져와 연결 시켜줌
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/members/new") //해당 주소로 들어오면 밑의 코드와 연결이 됨. 즉 해당 html을 보여주는 것
    public String createForm(){
        return "save";
    }

    @PostMapping("/members/new") //해당 html의 form 태그는 post 함수와 연결되어 있음. 즉 위의 GetMapping을 통해
    //createMemberForm.html으로 넘어갔다가 해당 post 함수로 인해 다시 이 코드로 온 것
    public String create(MemberForm form){ //MemberForm이란 클래스에서
        Member member = new Member();
        member.setName(form.getName());

        memberService.join(member);

        return "index"; //회원가입이 끝난 후 홈화면으로 돌림
    }

    @GetMapping("/members")
    public String List(Model model){
        List<Member> members = memberService.findMembers();
        model.addAttribute("members", members);
        return "members/memberList";
    }
}
