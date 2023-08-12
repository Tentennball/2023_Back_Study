package week3.seed.Domain;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;
    private String content;
    private String author;
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;
    private Date date;
}
