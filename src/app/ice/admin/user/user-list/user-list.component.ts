import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UsersService } from "../user-services/users.service";
import { Router } from "@angular/router";
import { UserList } from "app/ice/admin/user/user-models/userlist";
import { IceLogService } from "app/ice/services/ice-log.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UserListComponent implements OnInit {
  private result1: boolean = false;
  public rows: Array<UserList> = [];
  public selectedOption: number = 5;
  public temp: Array<UserList> = [];
  public searchValue: string = "";
  private tempData: Array<UserList> = [];
  public page: number = 1;
  public pageSize: number = this.selectedOption;
  public contentHeader: object;

  constructor(
    private service: UsersService,
    private router: Router,
    private logService: IceLogService
  ) {}

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Admin",
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
            name: "Users list",
            isLink: false,
          },
        ],
      },
    };
    this.service.getAllUsers().subscribe((value: Array<UserList>) => {
      this.logService.debug("Received all data");
      this.logService.debug(JSON.stringify(value));
      this.rows = value;
      this.tempData = this.rows;
      this.logService.debug("Tempdata copied");
    });
  }

  filterUpdate(event) {
    this.logService.debug("User is Searching");
    const val: string = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d: UserList) {
      if (d == null) {
        return;
      }
      return (
        d.firstName.toLowerCase().indexOf(val) !== -1 ||
        d.lastName.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    this.rows = temp;
  }

  addUser() {
    this.logService.debug("Add User Clicked");
    this.router.navigate(["/register"]);
  }

  selected(event) {
    this.logService.debug("Number selected " + event);
    this.pageSize = event;
  }

  confirmTextOpen(id) {
    this.logService.debug("I am In");
    this.service.deleteUser(id);
  }
}
