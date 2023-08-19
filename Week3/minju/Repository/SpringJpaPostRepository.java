package week3.seed.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import week3.seed.Domain.Post;

import java.util.List;

public interface SpringJpaPostRepository extends JpaRepository<Post, Long>, PostRepository {
    @Query("SELECT p FROM Post p ORDER BY p.views DESC")
    List<Post> findMostViewedPosts(@Param("count") int count);

    @Query("SELECT p FROM Post p ORDER BY p.views ASC")
    List<Post> findLatestPosts(@Param("count") int count);

    List<Post> findByTitleContaining(String text);

    List<Post> findByContentContaining(String text);

    @Query("SELECT p FROM Post p WHERE p.postId = :postId")
    List<Post> findByPostId(@Param("postId") Integer postId);
}

