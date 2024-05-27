import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { IceLogService } from "app/ice/services/ice-log.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { emailRequest } from "../../user-models/emailRequest";
import { UserList } from "../../user-models/userlist";

import { UsersService } from "../../user-services/users.service";

@Component({
  selector: "app-email-compose",
  templateUrl: "./email-compose.component.html",
  styleUrls: ["./email.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { class: "email-application" },
})
export class EmailComposeComponent implements OnInit {
  @Input() mailid: string;
  @Input() items: UserList;
  @HostListener("keydown.escape") fn() {
    this.closeCompose();
  }
  @ViewChild("selectRef") private _selectRef: any;

  // public emailToSelect = mailid

  // public emailCCSelect = [
  //   // { email: 'ice@cdac.in', avatar: 'assets/images/portrait/small/avatar-s-3.jpg' },
  //   // { email: 'dbt-ice@cdac.in', avatar: 'assets/images/portrait/small/avatar-s-1.jpg' },
  //   // { email: 'braf-helper@cdac.in', avatar: 'assets/images/portrait/small/avatar-s-4.jpg' },
  //   // { email: 'pallavin@cdac.in', avatar: 'assets/images/portrait/small/avatar-s-6.jpg' }
  // ];

  // public emailBCCSelect = [
  //   { email: 'ice1@cdac.in', avatar: 'assets/images/portrait/small/avatar-s-3.jpg' },
  //   { email: 'dbt-ice1@cdac.in', avatar: 'assets/images/portrait/small/avatar-s-1.jpg' },
  //   { email: 'braf-helper1@cdac.in', avatar: 'assets/images/portrait/small/avatar-s-4.jpg' },
  //   { email: 'pallavin1@cdac.in', avatar: 'assets/images/portrait/small/avatar-s-6.jpg' }
  // ];

  public emailCCSelected = "";
  public emailBCCSelected = "";
  public emailSubject: string = "";
  public isOpenCC = false;
  public isOpenBCC = false;
  public addDescription: string = "";

  public isComposeOpen: boolean = false;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _emailService: UsersService,
    private logService: IceLogService,
    private service: UsersService
  ) {
    this._unsubscribeAll = new Subject();
  }

  togglCcBcc(toggleRef) {
    // for(let i=0;i<this.items.length;i++){
    //   this.emailCCSelect= this.emailCCSelect+this.items[i].email
    // }
    // this.emailCCSelect=this.items.filter(e=>{
    //   return e.email;
    // });
    if (toggleRef == "cc") {
      this.isOpenCC = !this.isOpenCC;
    } else {
      this.isOpenBCC = !this.isOpenBCC;
    }
  }
  sendMail() {
    // this.logService.debug(JSON.stringify(this.emailCCSelected,this.emailBCCSelected));
    this.logService.debug(this.emailCCSelected + this.emailBCCSelected);
    this.logService.debug("          ");
    this.logService.debug(JSON.stringify(this.emailSubject));
    this.logService.debug("          ");
    this.logService.debug(JSON.stringify(this.addDescription));
    let data = new emailRequest();
    data.to = this.mailid;
    data.cc = this.emailCCSelected;
    data.bcc = this.emailBCCSelected;
    data.subject = this.emailSubject;
    data.message = this.addDescription;
    this.logService.debug(data);

    let response = this.service.sendMail(data).subscribe(
      (data) => {
        this.logService.debug(data);
      },
      (error) => {
        this.logService.error("" + JSON.stringify(error));
        // this.router.navigate(['**']);
        Swal.fire({
          icon: "error",
          title: "Not sent!",
          customClass: {
            confirmButton: "btn btn-warning",
          },
        });
      }
    );
    this.logService.debug(" Messaage " + response);
    this.logService.debug(response);
    if (response) {
      Swal.fire("Sent", "", "success");
    } else {
      Swal.fire({
        icon: "error",
        title: "Not sent!",
        customClass: {
          confirmButton: "btn btn-warning",
        },
      });
    }
    Swal.fire("Sent", "", "success");
    this.emailCCSelected = "";
    this.emailBCCSelected = "";
    this.emailSubject = "";
    this.addDescription = "";
    this.closeCompose();
  }

  closeCompose() {
    this.isComposeOpen = false;
    this._emailService.composeEmail(this.isComposeOpen);
  }

  ngOnInit(): void {
    // Subscribe to Compose Model Changes
    this._emailService.composeEmailChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        this.isComposeOpen = response;
        if (this.isComposeOpen) {
          // setTimeout(() => {
          //   this._selectRef.searchInput.nativeElement.focus();
          // }, 0);
        }
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
