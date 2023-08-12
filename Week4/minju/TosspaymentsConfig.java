    package week4.tosspayments;

    import lombok.Getter;
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.context.annotation.Configuration;

    @Configuration
    @Getter
    public class TosspaymentsConfig {

        @Value("${payment.toss.test_client_api_key}") //외부 설정파일 (ex.application/yml 에서 값을 읽어오란 소리)
        private String testClientApiKey;

        @Value("${payment.toss.test_secret_api_key}")
        private String testSecretKey;

        public String getTestSecretKey() {
            return testSecretKey;
        }

        @Value("${payment.toss.success_url}")
        private String success_url;

        @Value("${payment.toss.fail_url}")
        private String fail_url;

        public static final String url = "https://api.tosspayments.com/v1/payments/";

    }
