// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// const ssl = false;
export const environment = {
  production: false,
  hmr: false,
  // apiUrl: ssl ? "https://localhost:5000" : "http://localhost:5000",
  // keycloakUri: ssl
  //   ? "https://iam.bio.pune.cdac.in/auth"
  //   : "http://iam.bio.pune.cdac.in/auth",
  // keycloakClientId: "ice-angular",
  // keycloakRealm: "ice",
  // baseURL: ssl
  //   ? "https://ice-dev.bio.pune.cdac.in"
  //   : "http://ice-dev.bio.pune.cdac.in",
  // basePath: ssl
  //   ? "https://ice-dev.bio.pune.cdac.in/ice"
  //   : "http://ice-dev.bio.pune.cdac.in/ice",
  // log_level: 4,
  // websocketUrl: ssl
  //   ? "wss://websocket.bio.pune.cdac.in"
  //   : "ws://websocket.bio.pune.cdac.in",
  // s3Url: ssl ? "https://s3.bio.pune.cdac.in" : "http://s3.bio.pune.cdac.in",

  apiUrl: "http://localhost:5000",
  keycloakUri: "http://ice-dev.bio.pune.cdac.in/auth",
  keycloakClientId: "ice-angular",
  keycloakRealm: "ice",
  baseURL: "http://ice-dev.bio.pune.cdac.in",
  basePath: "http://localhost:5000/",
  log_level: 4,
  websocketUrl: "wss://ice-dev.bio.pune.cdac.in",
  s3Url: "http://s3.bio.pune.cdac.in",
  submissionurl: "https://10.208.27.111:8081",
  computeNamespace: "ice-compute",
  //dummyUrl:'https://reqres.in/api/users?page=2',
  //regurl:
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
