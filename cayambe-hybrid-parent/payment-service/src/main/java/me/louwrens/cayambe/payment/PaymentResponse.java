package me.louwrens.cayambe.payment;

import me.louwrens.cayambe.payment.model.ChargeStatus;
import me.louwrens.cayambe.payment.model.Payment;
import me.louwrens.cayambe.payment.stripe.ChargeResponse;

public class PaymentResponse {

    public String chargeId;
    public Long amount;
    public Integer orderId;
    public ChargeStatus chargeStatus = ChargeStatus.NONE;

    public PaymentResponse chargeId(String chargeId) {
        this.chargeId = chargeId;
        return this;
    }

    public PaymentResponse amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public PaymentResponse orderId(Integer orderId) {
        this.orderId = orderId;
        return this;
    }

    public PaymentResponse chargeStatus(ChargeStatus chargeStatus) {
        this.chargeStatus = chargeStatus;
        return this;
    }

    public static PaymentResponse newInstance(Payment payment, ChargeResponse chargeResponse) {
        return new PaymentResponse()
                .amount(payment.amount.movePointRight(2).longValue())
                .orderId(payment.orderId)
                .chargeStatus(payment.chargeStatus)
                .chargeId(chargeResponse.chargeId);
    }
}
