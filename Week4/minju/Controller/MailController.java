package week4.tosspayments.Controller;

import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import week4.tosspayments.Entity.History;
import week4.tosspayments.Repository.HistoryRepository;
import week4.tosspayments.Service.HistoryService;
import week4.tosspayments.TosspaymentsConfig;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpSession;
import java.util.Optional;

@Controller
@RequestMapping("/mail")
public class MailController {

    private final JavaMailSender mailSender;
    private final TosspaymentsConfig tosspaymentsConfig;

    private HistoryService historyService;

    private HistoryRepository historyRepository;

    @Autowired
    public MailController(
            JavaMailSender mailSender,
            TosspaymentsConfig tosspaymentsConfig,
            HistoryService historyService,
            HistoryRepository historyRepository
    ) {
        this.mailSender = mailSender;
        this.tosspaymentsConfig = tosspaymentsConfig;
        this.historyService = historyService;
        this.historyRepository = historyRepository;
    }

    @GetMapping
    @ResponseBody
    public String sendMail(HttpSession session) {
        try {
            MimeMessage m = mailSender.createMimeMessage();
            MimeMessageHelper h = new MimeMessageHelper(m, "UTF-8");
            h.setFrom(tosspaymentsConfig.getMail()); // 앞서 설정한 본인의 Naver Email
            h.setTo("migo9711@naver.com");

            // 이메일 제목 설정
            h.setSubject("토스 결제하셨습니다.");

            Long History_id = historyService.getCreatedHistoryId();
            Optional<History> history = historyRepository.findById(History_id);

            // session에서 orderId 값을 가져와서 이메일 본문에 추가
            String orderId = (String) session.getAttribute("orderId");
            String amount = String.valueOf(history.get().getTotalAmount());

            String emailBody = "총금액: " + amount + "\n주문 번호: " + orderId;
            h.setText(emailBody);

            System.out.println("이메일 값 확인"+orderId);

            mailSender.send(m);
            return "Mail sent successfully!";
        } catch (MessagingException e) {
            return "Failed to send mail: " + e.getMessage();
        }
    }
}

