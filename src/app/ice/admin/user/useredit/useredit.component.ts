import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { UsersService } from "../user-services/users.service";
import { IceLogService } from "app/ice/services/ice-log.service";
import { dateofbirth } from "../register/_helpers/date-of-birth.validator";
import { UserEdit } from "../user-models/userEdit";
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { emailValidation } from "../register/_helpers/emailcustome.validator";

@Component({
  selector: "app-edit",
  templateUrl: "./useredit.component.html",
  styleUrls: ["./useredit.component.scss"],
})
export class UserEditComponent implements OnInit {
  public basicPwdShow: boolean = false;
  public basicPwdShow1: boolean = false;
  public url: string = this.router.url;
  public urlLastValue: string;
  public currentRow: UserEdit;
  public userEditForm: FormGroup;
  public userEditFormSubmit: boolean = false;
  public contentHeader: object;
  maxDate = { year: new Date().getUTCFullYear() - 1, month: 12, day: 31 };
  minDate = { year: new Date().getUTCFullYear() - 100, month: 12, day: 31 };
  startDate = {
    year: new Date().getUTCFullYear() - 20,
    month: new Date().getUTCMonth(),
    day: 1,
  };

  genderList = this.service.genderList;

  constructor(
    private router: Router,
    private service: UsersService,
    private activatedRoute: ActivatedRoute,
    private logService: IceLogService
  ) {
    this.activatedRoute.params.subscribe((parameter) => {
      this.logService.debug("Parameter" + parameter);
      this.urlLastValue = parameter.id;
    });
  }

  ngOnInit() {
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
            isLink: true,
            link: "/admin/user/table",
          },
          {
            name: "Edit",
            isLink: false,
          },
        ],
      },
    };
    this.service.getUserById(this.urlLastValue).subscribe((value: UserEdit) => {
      //this.logService.debug("Found row that match the id ");
      this.currentRow = value;
      this.logService.debug(JSON.stringify(value));
      this.userEditForm.patchValue(this.currentRow);
    });
    this.initialteForms();
  }

  get submitted() {
    return this.userEditFormSubmit;
  }
  get form() {
    return this.userEditForm.controls;
  }
  onRadioChange(gender) {
    this.userEditForm.value.gender = gender.value;
    this.logService.debug(JSON.stringify(gender.value));
  }
  back() {
    this.router.navigate(["/admin/user/table"]);
  }
  formOnUpdate() {
    this.userEditFormSubmit = true;
    if (this.userEditForm.invalid) {
      Swal.fire("Validation Failed!", "", "error");
      return;
    }

    this.logService.debug(
      "SUCCESS!! :-)\n\n" + JSON.stringify(this.userEditForm.value)
    );
    // user = new userEdit();
    let user = this.userEditForm.value;
    this.logService.debug("form value" + this.userEditForm.value);
    this.logService.debug("User data :" + user.userName);
    this.logService.debug("User data " + user.name.firstName);
    this.logService.debug("Full Data" + JSON.stringify(user));
    this.service.editUser(user, user.id);
  }

  initialteForms() {
    this.userEditForm = new FormGroup(
      {
        id: new FormControl({ value: "" }, Validators.required),
        userName: new FormControl({ value: "" }, Validators.required),
        name: new FormGroup({
          firstName: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(225),
          ]),
          lastName: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(225),
          ]),
        }),
        email: new FormControl("", [Validators.required]),
        gender: new FormControl("", [Validators.required]),
        dateOfBirth: new FormControl("", [Validators.required]),
        address: new FormGroup({
          addressLine1: new FormControl("", [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(225),
          ]),
          addressLine2: new FormControl(""),
          landmark: new FormControl(""),
          city: new FormControl("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(225),
          ]),
          state: new FormControl("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(225),
          ]),
          zipCode: new FormControl("", [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10),
          ]),
        }),
        contactNumber: new FormControl({ value: "" }, Validators.required),
      },
      {
        validators: [dateofbirth, emailValidation],
      }
    );
  }
}
