import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { NiotServiceService } from "../niot-service/niot-service.service";

import { switchMap, tap } from "rxjs/operators";
import { BlastUnit } from "../niot-models/BlastUnit";
import { environment } from "environments/environment";
import { KeycloakService } from "keycloak-angular";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-blast-results",
  templateUrl: "./blast-results.component.html",
  styleUrls: ["./blast-results.component.scss"],
})
export class BlastResultsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public contentHeader: object;
  public urlLastValue: string;
  public oneUnit: BlastUnit;
  params: string;
  token;
  safeUrl: SafeResourceUrl;
  limit: number = 300;
  completeWords: boolean;
  isContentToggled: boolean;
  nonEditedContent: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: NiotServiceService,
    private keycloak: KeycloakService,
    private sanitizer: DomSanitizer
  ) {
    this.activatedRoute.params.subscribe((parameter) => {
      console.log("Parameter", parameter);
      this.urlLastValue = parameter.id;
    });
  }
  async downloadFile() {
    this.token = await this.keycloak.getToken();
    console.log(this.token);
    if (this.oneUnit) {
      window.open(
        environment.baseURL +
          "/storage/workflow/blastdownload/" +
          this.oneUnit.jobname +
          "?token=" +
          this.token
      );
    }
  }
  toggleContent() {
    this.isContentToggled = !this.isContentToggled;
    this.oneUnit.paramMap.sequence = this.isContentToggled
      ? this.nonEditedContent
      : this.formatContent();
  }
  formatContent() {
    if (this.completeWords) {
      this.limit = this.oneUnit.paramMap.sequence
        .substr(0, this.limit)
        .lastIndexOf(" ");
    }
    return `${this.oneUnit.paramMap.sequence.substr(0, this.limit)}...`;
  }
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "BLAST",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
          {
            name: "List",
            isLink: true,
            link: "/submit/blast",
          },
          {
            name: "Results",
            isLink: false,
          },
        ],
      },
    };
    this.service
      .getOneBlastDetails(this.urlLastValue)
      .pipe(
        tap((value: BlastUnit) => {
          this.oneUnit = value;
          console.log("doSomethingResponse", value);
          this.nonEditedContent = this.oneUnit.paramMap.sequence;
          this.oneUnit.paramMap.sequence = this.formatContent();
        }),
        switchMap(() => this.service.getResults(this.oneUnit.paramMap.output))
      )
      .subscribe(
        (result) => {
          console.log("doAnotherthingResponse");
          this.params = result;
          const unsafeUrl = "data:text/html;charset=UTF-8," + this.params;
          this.safeUrl =
            this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
        },
        (error) => {
          console.error("Error", error);
        }
      );
  }
}
