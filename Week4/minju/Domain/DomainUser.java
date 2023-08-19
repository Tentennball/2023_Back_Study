package week4.tosspayments.Domain;

import lombok.Data;

//회원가입때 쓸 도메인
@Data
public class DomainUser {
    String name;
    String email;
    String password;
    String phoneNumber;
}
