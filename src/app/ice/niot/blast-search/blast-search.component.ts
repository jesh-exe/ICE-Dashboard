import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { Subject } from "rxjs";
import { BlastList } from "../niot-models/BlastList";

@Component({
  selector: "app-blast-search",
  templateUrl: "./blast-search.component.html",
  styleUrls: ["./blast-search.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class BlastSearchComponent implements OnInit {
  public contentHeader: object;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public searchValue = "";
  private _unsubscribeAll: Subject<any>;
  private tempData: BlastList[] = [];
  public rows: BlastList[];
  constructor(private service: NiotServiceService) {}
  refresh() {
    this.getList();
  }
  getList() {
    this.service.listBlastSearch().subscribe((value: any) => {
      console.log("List", value);
      this.rows = value.list;
      this.tempData = this.rows;
    });
  }
  filterUpdate(event) {
    // this.logService.debug("User is Searching");
    const val: string = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d: BlastList) {
      if (d == null) {
        return;
      }
      return (
        d.jobName.toLowerCase().indexOf(val) !== -1 ||
        d.containerName.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    this.rows = temp;
  }

  ngOnInit(): void {
    this.getList();
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
            isLink: false,
          },
        ],
      },
    };
  }
}
