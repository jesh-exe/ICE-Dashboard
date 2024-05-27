import { environment } from "environments/environment";
import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloakUri,
        realm: environment.keycloakRealm,
        clientId: environment.keycloakClientId,
      },

      initOptions: {
        // checkLoginIframe: true,
        // checkLoginIframeInterval: 25,
        pkceMethod: "S256",
        enableLogging: true,
        // this will solved the error
        checkLoginIframe: false,
      },
      bearerExcludedUrls: ["s3.bio.pune.cdac.in"],
      // loadUserProfileAtStartUp: true
      // initOptions: {
      //   onLoad: 'check-sso',
      //   silentCheckSsoRedirectUri:
      //     window.location.origin + 'assets/silent-check-sso.html',
      // },
    });
}
