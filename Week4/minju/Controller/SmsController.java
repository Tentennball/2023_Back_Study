package week4.tosspayments.Controller;

import net.nurigo.java_sdk.Coolsms;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/sms")
public class SmsController {

    @GetMapping
    public String sendSms() {
        String api_key = "NCSWYTUTQAYGFATB";
        String api_secret = "0TXOVZXZM2ECXXV5DTYATOCKIJT90VWE";
        Coolsms coolsms = new Coolsms(api_key, api_secret);
        HashMap<String, String> params = new HashMap<String, String>();

        params.put("to", "받는 사람의 전화번호");
        params.put("from", "보내는 사람의 전화번호");
        params.put("type", "SMS");
        params.put("text", "문자 내용");
        params.put("app_version", "test app 1.2");

        try {
            JSONObject response = coolsms.sendSMS(params); // sendSMS 메서드 호출
            return response.toString();
        } catch (CoolsmsException e) {
            e.printStackTrace();
            return "Error: " + e.getMessage() + ", Code: " + e.getCode();
        }
    }
}
