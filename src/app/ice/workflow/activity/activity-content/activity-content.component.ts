import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { WorkflowService } from "app/ice/workflow/services/workflow.service";
import { ITerminalOptions, Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";
import { WebLinksAddon } from "xterm-addon-web-links";
import { debounce } from "lodash";
@Component({
  selector: "app-activity-content",
  templateUrl: "./activity-content.component.html",
  styleUrls: ["./activity-content.component.scss"],
})
export class ActivityContentComponent implements OnInit {
  public activeJob: Boolean;
  public Activity: any;
  @ViewChild("terminal", { static: true })
  termianlWrapper: ElementRef;
  terminal: Terminal;
  searchAddon = new SearchAddon();
  fitAddon = new FitAddon();
  webLinksAddon = new WebLinksAddon();

  baseTerminalOptions: ITerminalOptions = {
    fontSize: 16,
    lineHeight: 1.2,
    letterSpacing: 0,
    fontWeight: "400",
    fontFamily: 'Consolas, "Courier New", monospace',
    convertEol: true,
    cursorBlink: false,
    theme: { background: "#000000" },
    scrollback: Number.MAX_SAFE_INTEGER,
  };

  constructor(private service: WorkflowService) {
    this.terminal = new Terminal(this.baseTerminalOptions);
    this.terminal.loadAddon(this.fitAddon);
    this.terminal.loadAddon(this.searchAddon);
    this.terminal.loadAddon(this.webLinksAddon);
  }

  private readonly resizeFit = debounce(() => {
    this.fitAddon.fit();
  }, 500);

  ngOnInit(): void {
    this.terminal.open(this.termianlWrapper.nativeElement);
    window.addEventListener("resize", this.resizeFit);
    this.fitAddon.fit();
    this.service.onRunOpenChange.subscribe((res) => {
      this.activeJob = res;
    });

    this.service.onSelectedRunChange.subscribe((res) => {
      this.Activity = res;
      this.terminal.clear();
      if (!res.log) {
        res.log = "No logs";
      }
      this.terminal.writeln(res.log, () => {
        this.fitAddon.fit();
        this.terminal.scrollToTop();
      });
    });
  }
}
