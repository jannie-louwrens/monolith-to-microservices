package me.louwrens.cayambe.payment.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "payment")
public class Payment extends PanacheEntityBase {

    @Id
    @SequenceGenerator(
            name = "paymentSequence",
            sequenceName = "payment_sequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "paymentSequence")
    @Column(name = "id", updatable = false, nullable = false)
    public Integer id;

    @Column(name = "order_id")
    public Integer orderId;

    @Column(name = "card_token")
    public String cardToken;

    @Column(name = "charge_id")
    public String chargeId;

    @Column(precision = 19, scale = 2)
    public BigDecimal amount;

    @Enumerated(EnumType.STRING)
    public ChargeStatus chargeStatus = ChargeStatus.NONE;

    public String description;

    public Payment orderId(Integer orderId) {
        this.orderId = orderId;
        return this;
    }

    public Payment cardToken(String cardToken) {
        this.cardToken = cardToken;
        return this;
    }

    public Payment chargeId(String chargeId) {
        this.chargeId = chargeId;
        if (this.chargeStatus.equals(ChargeStatus.NONE)) {
            this.chargeStatus = this.chargeId != null ? ChargeStatus.SUCCESS : ChargeStatus.FAILED;
        }
        return this;
    }

    public Payment amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public Payment chargeStatus(ChargeStatus chargeStatus) {
        this.chargeStatus = chargeStatus;
        return this;
    }

    public Payment description(String description) {
        this.description = description;
        return this;
    }

}
