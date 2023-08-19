package week4.tosspayments.Entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status;
    private Date provatedAt;
    private String orderId;
    private String orderName;
    private String paymentKey;
    private double totalAmount;
    private String userId; // 이 부분은 실제로는 사용자 ID에 대한 참조가 될 수 있습니다.

    public History() {
        // 기본 생성자 내용을 필요에 따라 추가
    }

    public History(String status, Date provatedAt, String orderId, String orderName, String paymentKey, double totalAmount, String userId) {
        this.status = status;
        this.provatedAt = provatedAt;
        this.orderId = orderId;
        this.orderName = orderName;
        this.paymentKey = paymentKey;
        this.totalAmount = totalAmount;
        this.userId = userId;
    }

}

