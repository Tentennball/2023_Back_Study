package week3.seed.Service;

import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import week3.seed.Domain.Post;
import week3.seed.Domain.User;
import week3.seed.Repository.PostRepository;
import week3.seed.Repository.SpringJpaPostRepository;
import week3.seed.Repository.SpringJpaUsersRepository;
import week3.seed.Repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;

@Service
public class TestingService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private SpringJpaUsersRepository user_springRepository;
//    @Autowired
//    private SpringJpaPostRepository postRepository;

    public List<User>  generate_TestingUsers(int seed) {
        Faker faker = new Faker(new Locale("en"), new Random(seed));
        List<User> generate_Users = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            String email = faker.internet().emailAddress();
            String password = faker.internet().password();

            User user = new User();
            user.setEmail(email);
            user.setPassword(password);
            generate_Users.add(user);
            userRepository.save(user);
        }
        return generate_Users;
    }

    public List<Post> generate_TestingPost(int seed) {
        List<String> find_id= user_springRepository.findAllId();

        Faker faker = new Faker(new Locale("en"), new Random(seed));
        List<Post> create_Post = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            String title = faker.lorem().sentence();
            String content = faker.lorem().paragraph();
            int views = faker.number().numberBetween(0, 1000);
            int like = faker.number().numberBetween(0, 500);

            Post post = new Post();
            post.setTitle(title);
            post.setContent(content);
            post.setViews(views);
            post.setLikeCount(like);

            String randomUserId = find_id.get(faker.random().nextInt(find_id.size()));
            Long userId = Long.parseLong(randomUserId);

            User user = new User();
            user.setId(userId); // User 엔티티의 id 값을 설정합니다.
            post.setUser(user); // Post 엔티티의 user 필드를 설정합니다.

            create_Post.add(post);
            postRepository.save(post);
        }
        return create_Post;
    }

}

