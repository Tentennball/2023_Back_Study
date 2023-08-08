package hello.hellospring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

//@Controller //스프링이 실행될 때, 이 컨트롤러가 있다면 스프링이 컨트롤러 객체를 만들어서 저장을 해둠 -> 스프링 빈이 관리된다고 표현
public class HelloController {
   @GetMapping("hello")
    public String hello(Model model){
        model.addAttribute("data","hello!!");
        return "hello";
    }

    @GetMapping("hello-mvc")
    public String helloMvc(@RequestParam("name") String name, Model model) {
       model.addAttribute("name", name);
       return "hello-template";
   }

   @GetMapping("hello-string")
   @ResponseBody //html body 부분에 return 되는 값을 직접 넣겠다는 의미
    public String helloString(@RequestParam("name") String name) {
       return "hello" + name; // name을 spring 설정 시, "hello spring"
   } //차이점, view 같은 게 없고 반환된 값이 그대로 내려감

    @GetMapping("hello-api")
    @ResponseBody
    public Hello helloApi(@RequestParam("name") String name) {
       Hello hello = new Hello();
       hello.setName(name);
       return hello;
    }
    static class Hello {
       private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
