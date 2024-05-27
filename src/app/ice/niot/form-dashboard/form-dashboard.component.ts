import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-dashboard",
  templateUrl: "./form-dashboard.component.html",
  styleUrls: ["./form-dashboard.component.scss"],
})
export class FormDashboardComponent implements OnInit {
  public contentHeader: object;
  constructor() {}

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Submit",
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
            name: "Niot Form Dashboard",
            isLink: false,
          },
        ],
      },
    };
  }
}
