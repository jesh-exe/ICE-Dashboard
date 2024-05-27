import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.scss"],
})
export class UserDashboardComponent implements OnInit {
  public contentHeader: object;

  constructor() {}

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Dashboard",
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
            name: "User Dashboard",
            isLink: false,
          },
        ],
      },
    };
  }
}
