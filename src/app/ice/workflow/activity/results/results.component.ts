import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { Subject } from "rxjs";
import { WorkflowService } from "../../services/workflow.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as XLSX from "xlsx";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ResultsComponent implements OnInit, OnDestroy {
  @ViewChild("iframe") iframe: ElementRef;
  @ViewChild("modalVC") modalVC: ElementRef;
  public tableData: any;
  public tableTitle: any;
  public customPagination = 1;
  public recordsPerPage = 10;
  public tableRecords = [];
  public pageStartCount = 0;
  public pageEndCount = 10;
  public totalPageCount = 0;
  public currentPage = 0;
  private _unsubscribeAll: Subject<any>;
  public selectFiles: any[] = [];
  public selected: any[] = [];
  public filesSelected;
  public ColumnMode = ColumnMode;
  public page = 5;

  public pageLabel: string;
  SelectionType = SelectionType;
  constructor(
    private modalService: NgbModal,
    private service: WorkflowService
  ) {
    this._unsubscribeAll = new Subject();
  }
  onPageChange() {
    this.pageStartCount = this.currentPage * this.recordsPerPage;
    this.pageEndCount = this.pageStartCount + this.recordsPerPage;
    this.tableRecords = this.tableData.slice(
      this.pageStartCount,
      this.pageEndCount
    );
  }
  onSelect({ selected }) {
    this.filesSelected = selected[0];
    if (selected[0].type == "csv" || selected[0].type == "tsv") {
      this.service.getData(this.filesSelected.fileDownloadUri).then((value) => {
        console.log("CSV", value);
        const binarystr: string = value;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: "binary" });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
        // console.log(data); // Data will be logged in array format containing objects
        this.tableData = data;
        this.tableTitle = Object.keys(this.tableData[0]);
        this.tableRecords = this.tableData.slice(
          this.pageStartCount,
          this.pageEndCount
        );
      });
    }
    this.modalService.open(this.modalVC, {
      scrollable: true,
      size: "xl",
    });
  }

  ngOnInit(): void {
    this.service.onResultChange.subscribe((value) => {
      console.log(value);
      this.selectFiles = value.listOfFiles;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
