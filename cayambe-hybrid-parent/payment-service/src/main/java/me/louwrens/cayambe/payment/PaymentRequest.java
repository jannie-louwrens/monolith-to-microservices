package me.louwrens.cayambe.payment;

import me.louwrens.cayambe.payment.stripe.ChargeRequest;

public class PaymentRequest {

    public Integer orderId;
    public String cardToken;
    public String description;
    public Long amount;

    public PaymentRequest orderId(Integer orderId) {
        this.orderId = orderId;
        return this;
    }

    public PaymentRequest cardToken(String cardToken) {
        this.cardToken = cardToken;
        return this;
    }

    public PaymentRequest description(String description) {
        this.description = description;
        return this;
    }

    public PaymentRequest amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public ChargeRequest getStripeRequest() {
        return new ChargeRequest()
                .cardToken(this.cardToken)
                .description(this.description)
                .amount(this.amount);
    }
}
