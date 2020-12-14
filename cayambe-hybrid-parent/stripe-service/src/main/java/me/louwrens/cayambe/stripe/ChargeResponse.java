package me.louwrens.cayambe.stripe;

public class ChargeResponse {

    public String chargeId;
    public Long amount;

    public ChargeResponse chargeId(String chargeId) {
        this.chargeId = chargeId;
        return this;
    }

    public ChargeResponse amount(Long amount) {
        this.amount = amount;
        return this;
    }
}
