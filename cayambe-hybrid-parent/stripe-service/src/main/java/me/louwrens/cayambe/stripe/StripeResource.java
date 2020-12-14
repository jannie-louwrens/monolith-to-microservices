package me.louwrens.cayambe.stripe;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.HashMap;
import java.util.Map;

@Path("/stripe")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RolesAllowed("stripe-service-access")
public class StripeResource {

    @ConfigProperty(name = "stripe.key")
    String stripeKey;

    @ConfigProperty(name = "stripe.currency", defaultValue = "usd")
    String defaultCurrency;

    @POST
    @Path("/charge")
    public ChargeResponse submitCharge(ChargeRequest chargeRequest) throws StripeException {
        Stripe.apiKey = this.stripeKey;

        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", chargeRequest.amount);
        chargeParams.put("currency", this.defaultCurrency);
        chargeParams.put("description", chargeRequest.description);
        chargeParams.put("source", chargeRequest.cardToken);

        Charge charge = Charge.create(chargeParams);

        return new ChargeResponse()
                .chargeId(charge.getId())
                .amount(charge.getAmount());
    }
}