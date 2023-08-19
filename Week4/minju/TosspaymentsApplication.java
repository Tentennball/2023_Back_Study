package week4.tosspayments;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.util.Base64;

@SpringBootApplication
public class TosspaymentsApplication {

	public static void main(String[] args) {
		SpringApplication.run(TosspaymentsApplication.class, args);
	}
}

@Component
class ApplicationInitializer implements CommandLineRunner {

	//CommandLineRunner : 스프링 부트 애플리케이션이 시작될 때 실행되는 특정한 작업을 정의할 수 있는 인터페이스

	private final TosspaymentsConfig tosspaymentsConfig;

	public ApplicationInitializer(TosspaymentsConfig tosspaymentsConfig) {
		this.tosspaymentsConfig = tosspaymentsConfig;
	}

	@Override
	public void run(String... args) throws Exception {
		String apiKey = tosspaymentsConfig.getTestSecretKey();

		// 문자열을 바이트 배열로 변환하여 Base64 인코딩
		byte[] apiKeyBytes = apiKey.getBytes();
		String encodedApiKey = Base64.getEncoder().encodeToString(apiKeyBytes);
		tosspaymentsConfig.setEncodedApiKey(encodedApiKey);
		System.out.println(encodedApiKey);
	}
}
