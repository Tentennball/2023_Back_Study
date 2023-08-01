package Login.Week2.Entity;

import lombok.Getter;
import lombok.Setter;
import net.bytebuddy.asm.Advice;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity //데이터베이스의 테이블을 자바객체처럼 활용할 수 있게 함
@Setter
@Getter
@Table(name = "users") //DB에 실제 이 클래스에 정의한대로 생성이 됨. 즉 DB에 생성될 테이블 이름이라고 보면 됨
public class MemberEntity {
   @Id //pk 지정
   @GeneratedValue(strategy = GenerationType.IDENTITY) // MYSQL에서 auto_increment 지정(sequence 같은 느낌)
   private Long id;

   @Column(unique = true) //unique 제약조건 추가 => 이 필드는 중복된 값이 들어올 수 없도록 지정
   private String memberEmail;

   @Column
   private String memberPassword;

   @Column
   private String memberName;

   @Column(updatable = false)
   @CreatedDate
   private LocalDateTime createdAt;

   @PrePersist //해당 애노테이션은 위의 createdAt 필드가 생성되기 전에 먼저 불러짐.
               // 밑의 해당 함수를 통해 현재 시간을 기록 후, createdAt 객체 생성 후 현재 시간 저장됨.
               // 그리고 updatable 속성을 통해 더 이상 수정이 불가능하게 됨
   public void time() {
      this.createdAt = LocalDateTime.now();
   }


}
