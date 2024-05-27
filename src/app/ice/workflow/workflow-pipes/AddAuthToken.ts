import { Pipe, PipeTransform } from "@angular/core";
import { KeycloakService } from "keycloak-angular";

@Pipe({ name: "authToken" })
export class AddAuthToken implements PipeTransform {
  constructor(protected readonly keycloak: KeycloakService) {}
  async transform(url) {
    let token = await this.keycloak.getToken();
    url = url + "?token=" + token;
    return url;
  }
}
