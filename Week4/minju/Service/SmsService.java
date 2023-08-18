package week4.tosspayments.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import week4.tosspayments.Dto.MessageDTO;
import week4.tosspayments.Dto.PhoneNumDTO;
import week4.tosspayments.Dto.SmsRequestDTO;
import week4.tosspayments.Dto.SmsResponseDTO;
import week4.tosspayments.TosspaymentsConfig;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class SmsService {
    private final TosspaymentsConfig tosspaymentsConfig;
    public String makeSignature(Long time) throws NoSuchAlgorithmException, UnsupportedEncodingException, InvalidKeyException {
        String space = " ";
        String newLine = "\n";
        String method = "POST";
        String url = "/sms/v2/services/"+ tosspaymentsConfig.getServiceId() +"/messages";
        String timestamp = time.toString();
        String accessKey = tosspaymentsConfig.getAccessKey();
        String secretKey = tosspaymentsConfig.getSecretKey();

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        String encodeBase64String = Base64.getEncoder().encodeToString(rawHmac);

        return encodeBase64String;
    }

    public SmsResponseDTO sendSms(PhoneNumDTO phoneNumDTO, HttpSession session) throws JsonProcessingException, RestClientException, URISyntaxException, InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException {
        Long time = System.currentTimeMillis();
        String accessKey = tosspaymentsConfig.getAccessKey();
        String phone = tosspaymentsConfig.getPhone();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-ncp-apigw-timestamp", time.toString());
        headers.set("x-ncp-iam-access-key", accessKey);
        headers.set("x-ncp-apigw-signature-v2", makeSignature(time));

        MessageDTO messageDto = new MessageDTO(); // 메시지 생성

        messageDto.setTo(phoneNumDTO.getTo()); // 전화번호 설정
        messageDto.setOrderId((String) session.getAttribute("orderId")); // 주문번호 설정
        messageDto.setOrderName((String) session.getAttribute("Product")); // 제품명 설정
        messageDto.setOrderAmount((String) session.getAttribute("Price")); // 가격 설정

        String orderName = messageDto.getOrderName();
        String orderAmount = messageDto.getOrderAmount();
        String orderId = messageDto.getOrderId();

        List<MessageDTO> messages = new ArrayList<>();
        messages.add(messageDto);

        // .content 부분을 pn_dto에서 추출한 값들을 이용하여 조합
        String content = "주문번호:" + orderId + ", 주문명: " + orderName + ", 가격: " + orderAmount;

        SmsRequestDTO request = SmsRequestDTO.builder()
                .type("SMS")
                .contentType("COMM")
                .countryCode("82")
                .from(phone)
                .content(content)
                .messages(messages)
                .build();
        System.out.println("phone" + phone);

        ObjectMapper objectMapper = new ObjectMapper();
        String body = objectMapper.writeValueAsString(request);
        HttpEntity<String> httpBody = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        SmsResponseDTO response = restTemplate.postForObject(new URI("https://sens.apigw.ntruss.com/sms/v2/services/"+ tosspaymentsConfig.getServiceId() +"/messages"), httpBody, SmsResponseDTO.class);
        return response;
    }
}
