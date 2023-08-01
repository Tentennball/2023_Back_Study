package hello.hellospring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/") //도메인 첫 번째. localhost:8080으로 들어오면 밑 코드가 실행이 됨
    public String home(){
        return "home";
    }
}
