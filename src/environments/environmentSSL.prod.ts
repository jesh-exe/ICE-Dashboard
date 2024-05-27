export const environment = {
  production: true,
  hmr: false,
  apiUrl: location.origin,
  baseURL: location.origin,
  basePath: location.origin + "/",
  keycloakUri: location.origin + "/auth",
  keycloakClientId: "ice-angular",
  keycloakRealm: "ice",
  log_level: 4,
  websocketUrl: "wss://" + location.host,
  s3Url: "https://s3.bio.pune.cdac.in",
  computeNamespace: "ice-compute",
};
