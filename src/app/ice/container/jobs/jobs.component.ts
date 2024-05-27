import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  TemplateRef,
} from "@angular/core";
import { ITerminalOptions, Terminal } from "xterm";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { containerService } from "../container-service/container.service";
import { IceLogService } from "app/ice/services/ice-log.service";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Jobs } from "../container-model/Jobs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";
import screenfull from "screenfull";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { HotToastService } from "@ngneat/hot-toast";
import { environment } from "environments/environment";
import { ToastrService } from "ngx-toastr";
import { ClipboardService } from "ngx-clipboard";
import { debounce } from "lodash";
import { SearchAddon } from "xterm-addon-search";
import { WebLinksAddon } from "xterm-addon-web-links";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class JobsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  @ViewChild("modalLG", { read: TemplateRef })
  modalLG: TemplateRef<any>;
  modalLG1: TemplateRef<any>;
  public contentHeader: object;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public searchValue = "";
  private _unsubscribeAll: Subject<any>;
  private tempData: Jobs[] = [];
  public rows: Jobs[];
  public showLogs: string;
  private currentXterm;
  searchAddon = new SearchAddon();
  fitAddon = new FitAddon();
  webLinksAddon = new WebLinksAddon();
  baseTerminalOptions: ITerminalOptions = {
    fontSize: 16,
    lineHeight: 1.2,
    letterSpacing: 0,
    fontWeight: "400",
    fontFamily: 'Consolas, "Courier New", monospace',

    cursorBlink: false,
    theme: { background: "#000000" },

    scrollback: Number.MAX_SAFE_INTEGER,
  };
  constructor(
    private service: containerService,
    private logService: IceLogService,
    private modalService: NgbModal,
    private toast: HotToastService
  ) {
    this.logService.debug("jobs constr");
    this._unsubscribeAll = new Subject();
  }

  refresh() {
    this.getList();
  }

  LinkTo(jobName) {
    // console.log(environment.baseURL + "/" + jobName + "/", "_blank");
    window.open(environment.baseURL + "/" + jobName + "/", "_blank");
  }

  filterUpdate(event) {
    this.logService.debug("User is Searching");
    const val: string = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d: Jobs) {
      if (d == null) {
        return;
      }
      return (
        d.jobName.toLowerCase().indexOf(val) !== -1 ||
        d.imageName.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    this.rows = temp;
  }

  confirmTextOpen(jobName) {
    this.service.deleteAContainer(jobName);
  }
  // LinkTo(jobName) {
  //   window.open(
  //     " https://ice-dev.bio.pune.cdac.in/container/terminal/main.html?namespace=ice-container&container=app&name=" +
  //       jobName,
  //     "_blank"
  //   );
  // }
  logsOf(jobName) {
    this.service
      .getLogs(jobName)
      .pipe(
        this.toast.observe({
          loading: "Loading Logs of Terminal...",
          success: "Loaded Success",
          error: "There is an issue to loading instance.",
        })
      )
      .subscribe((value: any) => {
        this.logService.debug("Received all data");
        this.logService.debug(JSON.stringify(value));
        this.showLogs = value.log;
        this.logService.debug(JSON.stringify(this.showLogs));
      });
    this.modalService.open(this.modalLG, {
      scrollable: true,
      size: "xl",
    });
  }
  openTerminal(name) {
    this.showLogs = "";
    this.modalService.open(this.modalLG, {
      scrollable: true,
      size: "xl",
    });
    this.createServer(name);
  }
  getList() {
    this.service
      .getListOfPods()
      .pipe(
        this.toast.observe({
          loading: "Loading List of Pods...",
          success: "Loaded Success",
          error: "There is an issue to loading instance.",
        })
      )
      .subscribe((value: any) => {
        this.logService.debug("Received all data");
        this.logService.debug(JSON.stringify(value.jobs));
        this.rows = value.jobs;
        this.tempData = this.rows;
        this.logService.debug("Tempdata copied");
        this.logService.debug(JSON.stringify(this.rows));
      });
  }

  copyDynamicText(password) {
    if (password) {
      this.service.copytoClipboard(password);
    }
  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Container",
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
            name: "Jobs",
            isLink: false,
          },
        ],
      },
    };
    // this.openCompose();
    this.getList();
  }

  fullscreen() {
    var element;
    if (this.showLogs) {
      element = document.getElementById("log");
    } else {
      element = document.getElementById("modelPop");
    }
    if (screenfull.isEnabled) {
      console.log(screenfull.isFullscreen);
      if (!screenfull.isFullscreen) {
        this.currentXterm.resize(80, 61);
      } else {
        this.currentXterm.resize(24, 24);
      }
      screenfull.toggle(element);
      element.addEventListener("fullscreenchange", (event) => {
        console.log("fullscreen", event);
      });

      this.logService.debug(this.currentXterm.cols + this.currentXterm.rows);
      // window.addEventListener("resize", this.resizeFit);
    }
  }

  private readonly resizeFit = debounce(() => {
    this.fitAddon.fit();
  }, 100);

  createServer = (name) => {
    var term = new Terminal(this.baseTerminalOptions);
    term.loadAddon(this.fitAddon);
    term.loadAddon(this.searchAddon);
    term.loadAddon(this.webLinksAddon);

    term.open(document.getElementById("xterm-container"));
    term.writeln("Welcome to ICE\n");
    term.writeln("Your files are mounted at /data location\n\n");
    this.logService.debug(term.cols + term.rows);
    this.fitAddon.fit();
    this.currentXterm = term;
    var protocol = location.protocol === "https:" ? "wss://" : "ws://";
    var socketURL =
      environment.websocketUrl +
      "/compute/terminal/shell?name=" +
      name +
      "&namespace=" +
      environment.computeNamespace +
      "&container=app&cols=" +
      term.cols +
      "&rows=" +
      term.rows;
    const webSocket = new WebSocket(socketURL);
    term.loadAddon(new AttachAddon(webSocket));
    setTimeout(() => webSocket.send("bash\n"), 2000);

    window.addEventListener("resize", this.resizeFit);
    this.logService.debug(term.cols + term.rows);
  };
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
