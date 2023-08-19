package week4.tosspayments.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


@RestController
public class TossRequestController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/get-data")
    public String getDataFromExternalServer() {
        String url = "https://docs.tosspayments.com/guides/payment/test-success";
        String response = restTemplate.getForObject(url, String.class);

        System.out.println("Response from external server:");
        System.out.println(response); // 응답 데이터 출력

        return response;
    }

}