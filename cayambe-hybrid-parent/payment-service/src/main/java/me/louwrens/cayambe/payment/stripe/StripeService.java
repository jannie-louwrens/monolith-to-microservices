package me.louwrens.cayambe.payment.stripe;

import org.eclipse.microprofile.rest.client.annotation.RegisterClientHeaders;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/stripe")
@RegisterRestClient
@RegisterClientHeaders
public interface StripeService {

    @POST
    @Path("/charge")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    ChargeResponse charge(@HeaderParam("Authorization") String token, ChargeRequest chargeRequest);

}
