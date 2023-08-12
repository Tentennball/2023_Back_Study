package week3.seed.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import week3.seed.Domain.Post;

import java.util.List;

public interface PostRepository {
    Post save(Post post);
}
