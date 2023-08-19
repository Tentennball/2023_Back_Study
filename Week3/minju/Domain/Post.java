    package week3.seed.Domain;

    import lombok.Data;

    import javax.persistence.*;
    import java.util.Date;

    @Data
    @Entity
    public class Post {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer postId;
        private String title;
        @Column(columnDefinition = "TEXT")
        private String content;
        private Integer views;
        private Integer likeCount;

        @ManyToOne
        @JoinColumn(name = "user_id")
        private User user;

        private Date date;
    }