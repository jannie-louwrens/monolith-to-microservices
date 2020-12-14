package me.louwrens.cayambe.payment;

import me.louwrens.cayambe.payment.model.Payment;
import me.louwrens.cayambe.payment.stripe.ChargeResponse;
import me.louwrens.cayambe.payment.stripe.StripeService;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.AccessTokenResponse;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.math.BigDecimal;
import java.util.Collection;

@Path("/")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PaymentResource {

    @Inject
    KeycloakConfiguration keycloakConfiguration;

    @Inject
    @RestClient
    StripeService stripeService;

    @GET
    public Collection<Payment> allCharges() {
        return Payment.listAll();
    }

    @POST
    @Path("/sync")
    @Transactional
    public PaymentResponse chargeSync(PaymentRequest paymentRequest) {
        Payment payment = new Payment()
                .amount(BigDecimal.valueOf(paymentRequest.amount, 2))
                .cardToken(paymentRequest.cardToken)
                .orderId(paymentRequest.orderId)
                .description(paymentRequest.description);

        String token = getAccessToken();
        ChargeResponse response = stripeService.charge(token, paymentRequest.getStripeRequest());
        payment.chargeId(response.chargeId);
        payment.persist();

        return PaymentResponse.newInstance(payment, response);
    }

    private String getAccessToken() {
        Keycloak kc = KeycloakBuilder.builder()
                .realm(keycloakConfiguration.securityRealm)
                .clientId(keycloakConfiguration.clientId)
                .clientSecret(keycloakConfiguration.credentialsSecret)
                .grantType(keycloakConfiguration.grantType)
                .serverUrl(keycloakConfiguration.url)
                .build();
        AccessTokenResponse token = kc.tokenManager().getAccessToken();
        return "Bearer " + token.getToken();
    }

}