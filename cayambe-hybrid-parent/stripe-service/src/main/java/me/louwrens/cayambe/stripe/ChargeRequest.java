package me.louwrens.cayambe.stripe;

public class ChargeRequest {

    public String cardToken;
    public String description;
    public Long amount;

    public ChargeRequest cardToken(String cardToken) {
        this.cardToken = cardToken;
        return this;
    }

    public ChargeRequest description(String description) {
        this.description = description;
        return this;
    }

    public ChargeRequest amount(Long amount) {
        this.amount = amount;
        return this;
    }
}
