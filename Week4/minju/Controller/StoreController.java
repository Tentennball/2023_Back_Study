package week4.tosspayments.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import week4.tosspayments.Entity.Product;
import week4.tosspayments.Service.HistoryService;
import week4.tosspayments.Service.MemberService;
import week4.tosspayments.Service.StoreService;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Random;

@Controller
public class StoreController {

    @Autowired
    private StoreService storeService;
    @Autowired
    private MemberService memberService;
    @Autowired
    private HistoryService historyService;

    //DI => 스프링의 핵심. 해당 코드를 통해 컨트롤러, 레포지토리, 서비스가 연동될 수 있는 것
    public StoreController(StoreService storeService, MemberService memberService, HistoryService historyService) {
        this.storeService = storeService;
        this.memberService = memberService;
        this.historyService = historyService;
    }

    @GetMapping("/store")
    public String store_Create(Model model, HttpSession session){
        //seed 값 랜덤 생성
        Random random = new Random();
        int Seed = random.nextInt(1000) + 1;
        List<Product> products =  storeService.createProduct(Seed); //상점 생성

        String userEmail = (String) session.getAttribute("userEmail");
        String userName = memberService.getNameFromMemberEmail(userEmail);

        // /toss로 접속시 랜덤한 상품 보여줌
        if (!products.isEmpty()) {
            int randomIndex = random.nextInt(products.size());
            Product randomProduct = products.get(randomIndex);
            model.addAttribute("constructor",userName);
            model.addAttribute("product_name", randomProduct.getProductName());
            model.addAttribute("seller", randomProduct.getSeller());
            model.addAttribute("price", randomProduct.getPrice());

            //해당 랜덤product에서 불러온 값은 화폐단위가 붙어있어서
            String priceString = randomProduct.getPrice().replaceAll("[^0-9.]", ""); // 숫자와 소수점만 추출
            session.setAttribute("Price", priceString);
            session.setAttribute("Product",randomProduct.getProductName());
        }
        return "store";
    }

    @PostMapping("/store")
    public ModelAndView history_create (HttpSession session) {
        try {

            historyService.create_history(session);

            RedirectView redirectView = new RedirectView("/toss");
            return new ModelAndView(redirectView);
        } catch (IllegalStateException e) {
            e.printStackTrace();
            return new ModelAndView("error"); // error 발생 페이지로 이동
        }
    }

}

