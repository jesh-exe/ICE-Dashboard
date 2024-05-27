import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-list-pipelines",
  templateUrl: "./list-pipelines.component.html",
  styleUrls: ["./list-pipelines.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ListPipelinesComponent implements OnInit {
  public contentHeader: object;
  public active: any = 2;

  constructor() {}

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Workflow",
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
            name: "Pipelines",
            isLink: false,
          },
        ],
      },
    };
  }
}
