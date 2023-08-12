package week4.tosspayments;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.io.IOException;

@SpringBootApplication
public class TosspaymentsApplication {

	public void confirmPayment() throws IOException, InterruptedException {
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("https://api.tosspayments.com/v1/payments/confirm"))
				.header("Authorization", "Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==")
				.header("Content-Type", "application/json")
				.method("POST", HttpRequest.BodyPublishers.ofString("{\"paymentKey\":\"YOUR_PAYMENT_KEY\",\"amount\":15000,\"orderId\":\"S-WTqIm5SRDajklQM7Rex\"}"))
				.build();

		HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
		System.out.println(response.body());
	}
 	public static void main(String[] args) {
 		 SpringApplication.run(TosspaymentsApplication.class, args);
		TossPaymentConfirm tossPaymentConfirm = new TossPaymentConfirm();
		try {
			tossPaymentConfirm.confirmPayment();
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
		}
 	}
}
