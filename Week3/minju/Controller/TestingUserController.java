package week3.seed.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import week3.seed.Domain.Post;
import week3.seed.Domain.Seed;
import week3.seed.Domain.User;
import week3.seed.Service.TestingService;

import java.util.List;

@RestController
@RequestMapping("/v1/testing")
public class TestingUserController {
    @Autowired
    private TestingService testingService;

    @Autowired
    private ObjectMapper objectMapper; // Jackson ObjectMapper

    @PostMapping("/testingUser")
    public ResponseEntity<String> TestingUsers(@RequestBody Seed seed) {
        int Seed = seed.getSeed();
        List<User> Users = testingService.generate_TestingUsers(Seed);

        try {
            // List<User>를 Json 형태로 변환하여 ResponseEntity로 반환
            String json = objectMapper.writeValueAsString(Users);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            // 변환 중 에러가 발생할 경우 에러 응답 반환
            return ResponseEntity.status(500).body("Error occurred while converting to JSON.");
        }
    }

    @PostMapping("/testingPost")
    public ResponseEntity<String> TestingPost(@RequestBody Seed seed) {
        int Seed = seed.getSeed();
        List<Post> Post = testingService.generate_TestingPost(Seed);
        try {
            String json = objectMapper.writeValueAsString(Post);
            return ResponseEntity.ok(json);
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("Error occurred while converting to JSON.");
        }
    }
}

