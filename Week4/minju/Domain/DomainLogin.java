package week4.tosspayments.Domain;

import lombok.Data;

//로그인때 쓸 도메인
@Data
public class DomainLogin {
    String email;
    String password;
}
