package week4.tosspayments.Dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class MessageDTO {
    String to;
    String OrderId;
    String OrderName;
    String OrderAmount;
}