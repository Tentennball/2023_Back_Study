package week3.seed.Service;

import org.springframework.beans.TypeMismatchException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import week3.seed.Domain.Post;
import week3.seed.Repository.PostRepository;
import week3.seed.Repository.SpringJpaPostRepository;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private SpringJpaPostRepository postRepository;

    public List<Post> getPosts(String type, int count) {
        List<Post> posts = new ArrayList<>();

        if ("most".equals(type)) {
            posts = postRepository.findMostViewedPosts(count);
        } else if ("recent".equals(type)) {
            posts = postRepository.findLatestPosts(count);
        }

        return posts;
    }

    public List<Post> getSearch(String type, String text) {
        List<Post> search = new ArrayList<>();

        if ("title".equals(type)) {
            search = postRepository.findByTitleContaining(text);
        } else if ("content".equals(type)) {
            search = postRepository.findByContentContaining(text);
        } else if ("writer".equals(type)) {
            try {
                Integer postId = Integer.parseInt(text);
                List<Post> postList = postRepository.findByPostId(postId);
                if (!postList.isEmpty()) {
                    search.addAll(postList);
                } else {
                    throw new EntityNotFoundException("No post found with the given postId: " + postId);
                }
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid postId format: " + text,e);
            }
        }

        return search;
    }

}
