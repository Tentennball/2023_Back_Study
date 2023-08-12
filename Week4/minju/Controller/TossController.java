package week4.tosspayments.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import week4.tosspayments.Entity.History;
import week4.tosspayments.Repository.HistoryRepository;
import week4.tosspayments.Service.HistoryService;
import week4.tosspayments.Service.MemberService;

import javax.servlet.http.HttpSession;
import java.util.Optional;
import java.util.Random;

@Controller
public class TossController {

   @Autowired
   private HistoryRepository historyRepository;

    @Autowired
    private HistoryService historyService;

    @Autowired
    private MemberService memberService;

    public TossController(HistoryRepository historyRepository, HistoryService historyService, MemberService memberService) {
        this.historyRepository = historyRepository;
        this.historyService = historyService;
        this.memberService = memberService;
    }

    @GetMapping("/toss")
    public String toss(Model model, HttpSession session){

        Long History_id = historyService.getCreatedHistoryId();
        Optional<History> history = historyRepository.findById(History_id);

        String product =  (String) session.getAttribute("Product");
        String userEmail = (String) session.getAttribute("userEmail");
        String customerName = memberService.getNameFromMemberEmail(userEmail);
        // 랜덤한 8자리 숫자 생성
        int randomOrderId = generateRandomOrderId();
        String orderId = String.format("%08d", randomOrderId); // 8자리 숫자로 포맷팅

        model.addAttribute("amount", history.get().getTotalAmount());
        model.addAttribute("orderId", orderId);
        model.addAttribute("orderName", product);
        model.addAttribute("customerName", customerName);

        // 아래 라인을 추가하여 변수 값들을 출력하도록 합니다.
        System.out.println("amount: " + history.get().getTotalAmount());
        System.out.println("orderId: " + orderId);
        System.out.println("orderName: " + product);
        System.out.println("customerName: " + customerName);

        return "tosspayments";
    }

    // generateRandomOrderId 메서드 정의
    private int generateRandomOrderId() {
        Random rand = new Random();
        return rand.nextInt(100000000); // 0부터 99999999 사이의 랜덤 숫자
    }
}


/*
*       amount: 100, // 결제 금액
        orderId: 'kQsFsaEWVDbLPN81CZk_s', // 주문 ID(주문 ID는 상점에서 직접 만들어주세요.)
        orderName: '테스트 결제', // 주문명
        customerName: '김토스', // 구매자 이름
        * */