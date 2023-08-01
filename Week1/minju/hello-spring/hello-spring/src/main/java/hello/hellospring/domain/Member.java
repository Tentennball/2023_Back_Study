package hello.hellospring.domain;

import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private int createdAt;
    private int updatedAt;

    // Getter 메서드들
    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public int getCreatedAt() {
        return createdAt;
    }

    public int getUpdatedAt() {
        return updatedAt;
    }

    // Setter 메서드들
    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public void setCreatedAt(int createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(int updatedAt) {
        this.updatedAt = updatedAt;
    }
}
