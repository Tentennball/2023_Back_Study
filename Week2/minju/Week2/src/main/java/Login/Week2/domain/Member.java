package Login.Week2.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //DB가 id를 알아서 생성해주는 걸 Identitiy라고 함
    private Long id; //시스템에서 자동으로 세팅해 줄 id 값

    //@Column(name="username"); => 해당 컬럼이 username인 걸 찾아 매핑해줌
    private String name; //사용자가 직접 입력할 본인의 이름

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name; // this 키워드를 사용하여 클래스의 속성에 값을 할당
    }
}