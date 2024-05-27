import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-manager-niot-form-data",
  templateUrl: "./manager-niot-form-data.component.html",
  styleUrls: ["./manager-niot-form-data.component.scss"],
})
export class ManagerNiotFormDataComponent implements OnInit {
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
            name: "Submit",
            isLink: false,
          },
        ],
      },
    };
  }
}
