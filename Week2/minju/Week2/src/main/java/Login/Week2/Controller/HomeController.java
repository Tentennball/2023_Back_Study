package Login.Week2.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller//스프링 빈에 등록
public class HomeController {
    // 기본 페이지 요청 메서드
    @GetMapping("/")
    public String index(){ return "index"; } //resolver가 templates에서 해당 html 파일 찾아서 반환
}
