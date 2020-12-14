package me.louwrens.cayambe.payment;

import io.quarkus.arc.config.ConfigProperties;

@ConfigProperties(prefix = "keycloak")
public class KeycloakConfiguration {

    public String url;
    public String securityRealm;
    public String clientId;
    public String credentialsSecret;
    public String grantType;

}
