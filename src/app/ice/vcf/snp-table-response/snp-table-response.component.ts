import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { IceLogService } from "app/ice/services/ice-log.service";

@Component({
  selector: "app-snp-table-response",
  templateUrl: "./snp-table-response.component.html",
  styleUrls: ["./snp-table-response.component.scss"],
})
export class SnpTableResponseComponent implements OnInit {
  @Input() msgResponse: any;
  @Input() selectCollection: any;
  public data;
  ColumnMode = ColumnMode;
  public selectedOption = 10;
  public selectedStatus = [];
  public searchValue = "";
  private tempData = [];
  loadingIndicator = true;
  reorderable = true;
  JsonFields = [
    "recordID",
    "chromosome",
    "chromosome_Position",
    "ref",
    "setOne",
    "setOneRaw",
    "setTwo",
    "setTwoRaw",
    "geneList",
  ];

  constructor(private logService: IceLogService) {}

  ngOnChanges() {
    this.data = this.msgResponse.outputSNPBean;
    this.tempData = this.data;
  }

  ngOnInit(): void {
    this.data = this.msgResponse.outputSNPBean;
    this.tempData = this.data;
  }
  JsonToCSV() {
    this.logService.debug("Download CSV Button Clicked");
    var csvStr = this.JsonFields.join(",") + "\n";
    this.data.forEach((element) => {
      var recordID = element.recordID;
      var chromosome = element.chromosome;
      var chromosome_Position = element.chromosome_Position;
      var ref = element.ref;
      var test = element.setOne.toString().replace(",", "|");
      var setOne = test;
      var testone = element.setOneRaw.toString().replace(",", "|");
      var setOneRaw = testone;
      var test1 = element.setTwo.toString().replace(",", "|");
      var setTwo = test1;
      var testtwo = element.setTwoRaw.toString().replace(",", "|");
      var setTwoRaw = testtwo;
      var geneList = element.geneList;

      csvStr +=
        recordID +
        "," +
        chromosome +
        "," +
        chromosome_Position +
        "," +
        ref +
        "," +
        setOne +
        "," +
        setOneRaw +
        "," +
        setTwo +
        "," +
        setTwoRaw +
        "," +
        geneList +
        "\n";
    });
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvStr);
    hiddenElement.target = "_blank";
    hiddenElement.download = this.selectCollection + ".csv";
    hiddenElement.click();
  }
  JsonToTSV() {
    this.logService.debug("Download TSV Button Clicked");
    var tsvStr = this.JsonFields.join("\t") + "\n";
    this.data.forEach((element) => {
      var recordID = element.recordID;
      var chromosome = element.chromosome;
      var chromosome_Position = element.chromosome_Position;
      var ref = element.ref;
      var setOne = element.setOne;
      var setOneRaw = element.setOneRaw;
      var setTwo = element.setTwo;
      var setTwoRaw = element.setTwoRaw;
      var geneList = element.geneList;

      tsvStr +=
        recordID +
        "\t" +
        chromosome +
        "\t" +
        chromosome_Position +
        "\t" +
        ref +
        "\t" +
        setOne +
        "\t" +
        setOneRaw +
        "\t" +
        setTwo +
        "\t" +
        setTwoRaw +
        "\t" +
        geneList +
        "\n";
    });
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/tsv;charset=utf-8," + encodeURI(tsvStr);
    hiddenElement.target = "_blank";
    hiddenElement.download = this.selectCollection + ".tsv";
    hiddenElement.click();
  }

  filterUpdate(event) {
    this.logService.debug("User is searching...");
    const filter = event.target.value.toLowerCase();
    var cp = filter.indexOf(":");
    var cr = filter.indexOf("-");
    if (cp > 0 && cr > 0) {
      var ch = filter.substring(0, cp);
      // chr1:109114324-119895261
      //chr1:100000000-120000000
      var start = Number(filter.substring(cp + 1, cr));
      var end = Number(filter.substring(cr + 1));
      // debugger;
      const temp = this.tempData.filter(function (data) {
        if (
          data.chromosome === ch &&
          data.chromosome_Position >= start &&
          data.chromosome_Position <= end
        ) {
          return data;
        }
      });
      this.data = temp;
    } else if (cp > 0) {
      var ch = filter.substring(0, cp);
      var startfor = filter.substring(cp + 1);
      // debugger;
      // chr1:1955806
      const temp = this.tempData.filter(function (data) {
        if (data.chromosome === ch && data.chromosome_Position === startfor) {
          return data;
        }
      });
      this.data = temp;
    } else {
      // debugger;
      const temp = this.tempData.filter(function (d) {
        d.chromosome_Position = d.chromosome_Position.toString();
        return (
          d.chromosome.toLowerCase().indexOf(filter) !== -1 ||
          d.chromosome_Position.toLowerCase().indexOf(filter) !== -1 ||
          d.recordID.toLowerCase().indexOf(filter) !== -1
        );
        // || d.geneList.toLowerCase().indexOf(filter) !== -1 || !filter;
      });
      this.data = temp;
    }
  }

  filterUpdate_old(event) {
    this.logService.debug("User is searching...");
    this.selectedStatus = this.data[0];
    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d) {
      d.chromosome_Position = d.chromosome_Position.toString();
      return (
        d.chromosome.toLowerCase().indexOf(val) !== -1 ||
        d.chromosome_Position.toLowerCase().indexOf(val) !== -1 ||
        d.recordID.toLowerCase().indexOf(val) !== -1 ||
        new String(d.chromosome + ":" + d.chromosome_Position)
          .toLowerCase()
          .indexOf(val) !== -1 ||
        // new String(d.chromosome+':'+d.chromosome_Position+'-'+d.chromosome_Position).toLowerCase().indexOf(val)!==-1
        d.geneList.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    this.data = temp;
  }
}
