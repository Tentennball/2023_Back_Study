package week3.seed.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import week3.seed.Domain.Post;
import week3.seed.Service.PostService;

import java.util.List;

@RestController
@RequestMapping("/v1/post")
public class GetPostController {
    @Autowired
    private PostService postService;

    @Autowired
    private ObjectMapper objectMapper; // Jackson ObjectMapper

    @GetMapping("/list")
    public ResponseEntity<String> getPostList(@RequestParam String type, @RequestParam int count) {
        List<Post> posts = postService.getPosts(type, count);

        try {
            if (posts.size() > count) { // 이 부분이 추가된 부분입니다.
                posts = posts.subList(0, count); // 이 부분이 추가된 부분입니다.
            }
            String jsonPosts = objectMapper.writeValueAsString(posts);
            return ResponseEntity.ok(jsonPosts);
        } catch (JsonProcessingException e) {
            e.printStackTrace(); // ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<String> getSearch(@RequestParam String type, @RequestParam String text) {
        List <Post> search = postService.getSearch(type, text);

        try {
            String jsonSearchResults = objectMapper.writeValueAsString(search);
            return ResponseEntity.ok(jsonSearchResults);
        }
        catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

