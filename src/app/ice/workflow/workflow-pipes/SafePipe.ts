import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { KeycloakService } from "keycloak-angular";

@Pipe({ name: "safe" })
export class SafePipe implements PipeTransform {
  constructor(
    private domSanitizer: DomSanitizer,
    protected readonly keycloak: KeycloakService
  ) {}
  async transform(url) {
    let token = await this.keycloak.getToken();
    url = url + "?token=" + token;
    url = this.domSanitizer.bypassSecurityTrustResourceUrl(url);

    return url;
  }
}
