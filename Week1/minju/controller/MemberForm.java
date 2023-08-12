package hello.hellospring.controller;
//form 태그는 값을 입력할 수 있는 html 태그임
public class MemberForm {
    private String email;
    private String password;
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {this.password = password;
    }
}
