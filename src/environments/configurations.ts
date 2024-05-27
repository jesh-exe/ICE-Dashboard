import { environment } from "./environment";
export class Configurations {
  public getApiurl(): string {
    return environment.apiUrl;
  }
  public getKeycloakUri(): string {
    return environment.keycloakUri;
  }
  public getKeycloakClientId(): string {
    return environment.keycloakClientId;
  }
  public getKeycloakRealm(): string {
    return environment.keycloakRealm;
  }
  public getBaseURL(): string {
    return environment.keycloakRealm;
  }
  public getBasePath(): string {
    return environment.keycloakRealm;
  }
  public getLog_level(): number {
    return environment.log_level;
  }
  public getWebsocketUrl(): string {
    return environment.websocketUrl;
  }
  public getS3Url(): string {
    return environment.s3Url;
  }
  //   private apiUrl: string;
  //   private keycloakUri: string;
  //   private keycloakClientId: string;
  //   private keycloakRealm: string;
  //   private baseURL: string;
  //   private basePath: string;
  //   private log_level: number;
  //   private websocketUrl: string;
  //   private s3Url: string;
  //   public constructor(
  //     apiUrl: string,
  //     keycloakUri: string,
  //     keycloakClientId: string,
  //     keycloakRealm: string,
  //     baseURL: string,
  //     basePath: string,
  //     log_level: number,
  //     websocketUrl: string,
  //     s3Url: string
  //   ) {
  //     this.apiUrl = apiUrl;
  //     this.keycloakUri = keycloakUri;
  //     this.keycloakClientId = keycloakClientId;
  //     this.keycloakRealm = keycloakRealm;
  //     this.baseURL = baseURL;
  //     this.basePath = basePath;
  //     this.log_level = log_level;
  //     this.websocketUrl = websocketUrl;
  //     this.s3Url = s3Url;
  //   }
}
