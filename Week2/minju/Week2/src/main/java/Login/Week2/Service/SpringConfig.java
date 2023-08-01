package Login.Week2.Service;


import Login.Week2.Repository.JpaMemberRepository;
import Login.Week2.Repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;

@Configuration
public class SpringConfig {
    private EntityManager em;
    @Autowired
    public SpringConfig(EntityManager em) { this.em = em;}

    @Bean //스피링빈에 자바스크립트 코드를 이용해 수동으로 등록해줄 거란 의미
    public MemberService memberService(){
        return new MemberService(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository(){
        return new JpaMemberRepository(em);
    }

    //@Bean //AOP같은 경우에는 이렇게 빈에 직접적으로 등록해서 알려주는 것이 좋음
    //public TimeTraceAop timeTraceAop(){return new TimeTraceAop();}
//    동작 과정
//    1. @Bean을 통해 MemberService와 MemberRepository를 스프링빈에 등록함
//    2. 스프링이 시작될 때, 스프링 빈에서 등록된 위 2개를 가져와서 쓸 수 있음

}
