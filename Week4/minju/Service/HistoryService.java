package week4.tosspayments.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import week4.tosspayments.Entity.History;
import week4.tosspayments.Entity.Product;
import week4.tosspayments.Repository.HistoryRepository;
import week4.tosspayments.Repository.ProductBoot_Repository;
import week4.tosspayments.Repository.ProductRepository;
import week4.tosspayments.TosspaymentsConfig;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class HistoryService {

    @Autowired
    private MemberService memberService;
    @Autowired
    private ProductService productService;

    private final HistoryRepository historyRepository; // HistoryRepository를 추가로 주입받아야 합니다.
    private final TosspaymentsConfig tosspaymentsConfig;

    public HistoryService(TosspaymentsConfig tosspaymentsConfig, MemberService memberService,
                          ProductService productService, HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
        this.memberService = memberService;
        this.productService = productService;
        this.tosspaymentsConfig = tosspaymentsConfig;
    }

    private History createdHistory;

    public void create_history(HttpSession session) {

        String status = "Done";

        String product = (String) session.getAttribute("Product");
        String orderId = String.valueOf(productService.getProductIdFromProductName(product));

        long creationTimeMillis = session.getCreationTime();
        Date provatedAt = new Date(creationTimeMillis);

        String userEmail = (String) session.getAttribute("userEmail");
        String orderName = memberService.getNameFromMemberEmail(userEmail);
        String paymentKey = tosspaymentsConfig.getTestSecretKey();

        //숫자와 소수점만 파싱하는 과정! 원래 원 단위도 포함되어 있었음
        String priceString = (String) session.getAttribute("Price");
        double totalAmount = Double.parseDouble(priceString.replaceAll("[^0-9.]", ""));

        String userId = memberService.getNameFromMemberEmail(userEmail); // 사용자 ID를 설정합니다.

        // History 엔티티 생성
        History history = new History(status, provatedAt, orderId, orderName, paymentKey, totalAmount, userId);

        // History 엔티티 저장
        // History 엔티티 저장
        createdHistory = history; // 클래스 필드에 History 객체 저장
        historyRepository.save(history);
    }

    public Long getCreatedHistoryId() {
        if (createdHistory != null) {
            return createdHistory.getId();
        }
        return null;
    }

}
    /*
    *
    String status = "created"; // 결제 상태 등을 설정합니다.
    String orderId = "your-order-id"; // 주문 ID를 설정합니다.
    String orderName = "your-order-name"; // 주문명을 설정합니다.
    String paymentKey = "your-payment-key"; // 결제 키 또는 토큰을 설정합니다.
    double totalAmount = Double.parseDouble((String) session.getAttribute("Price")); // 세션에서 가격 정보를 가져와 설정합니다.
    String userId = "your-user-id"; // 사용자 ID를 설정합니다.
    * */

