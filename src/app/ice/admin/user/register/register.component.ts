import { Component, Injectable, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { dateofbirth } from "./_helpers/date-of-birth.validator";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { UsersService } from "../user-services/users.service";
import { IceLogService } from "app/ice/services/ice-log.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Router } from "@angular/router";
import { emailValidation } from "./_helpers/emailcustome.validator";
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = "/";

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : "";
  }
}
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class RegisterComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public basicPwdShow: boolean = false;
  public basicPwdShow1: boolean = false;
  public userRegisterForm: FormGroup;
  public userRegisterFormSubmit: boolean = false;
  public value;
  public contentHeader: object;
  maxDate = { year: new Date().getUTCFullYear(), month: 12, day: 31 };
  minDate = { year: new Date().getUTCFullYear() - 100, month: 12, day: 31 };
  startDate = {
    year: new Date().getUTCFullYear() - 20,
    month: new Date().getUTCMonth(),
    day: 1,
  };
  public userName: string;
  public email: string;
  public contactNumber: number;
  public organization: string;
  genderList = this.service.genderList;
  public State: string;
  public States: string[] = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  constructor(
    private service: UsersService,
    private logService: IceLogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Register",
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
            name: "Register",
            isLink: false,
          },
        ],
      },
    };
    this.userRegisterForm = new FormGroup(
      {
        userName: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(16),
          Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
          Validators.pattern(/^[a-z0-9]*$/),
        ]),
        name: new FormGroup({
          firstName: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[A-Za-z0-9_.,-]*$/),
          ]),
          lastName: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[A-Za-z0-9_.,-]*$/),
          ]),
        }),
        email: new FormControl("", [
          Validators.required,
          Validators.maxLength(50),
        ]),
        // password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(225)]),
        // confPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(225)]),
        gender: new FormControl("", [Validators.required]),
        dateOfBirth: new FormControl("", [Validators.required]),
        address: new FormGroup({
          addressLine1: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(75),
          ]),
          addressLine2: new FormControl("", [
            Validators.minLength(2),
            Validators.maxLength(75),
          ]),
          landmark: new FormControl("", [
            Validators.minLength(2),
            Validators.maxLength(75),
          ]),
          city: new FormControl("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ]),
          state: new FormControl("", [
            Validators.required,
            Validators.maxLength(30),
          ]),
          zipCode: new FormControl("", [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10),
            Validators.pattern("^[0-9]*$"),
          ]),
        }),
        contactNumber: new FormControl("", [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern("[0-9]{10}"),
        ]),
        organization: new FormControl("", [
          Validators.minLength(2),
          Validators.maxLength(75),
        ]),
      },
      {
        validators: [dateofbirth, emailValidation],
      }
    );
    this.logService.error(JSON.stringify(this.form.userName.errors));
  }
  userNameValidation() {
    this.service.userNameExists(this.userName).subscribe(
      (value) => {
        this.userRegisterForm.controls.userName.setErrors(null);
      },
      (error) => {
        this.logService.error(JSON.stringify(error));
        if (error.status === 404) {
          this.userRegisterForm.controls.userName.setErrors({
            userNameInvalid: true,
          });
        }
      }
    );
  }
  emailValidation() {
    this.service.emailexists(this.email).subscribe(
      (value) => {
        this.userRegisterForm.controls.email.setErrors(null);
      },
      (error) => {
        this.logService.error(JSON.stringify(error));
        if (error.status === 404) {
          this.userRegisterForm.controls.email.setErrors({
            emailInvalid: true,
          });
        }
      }
    );
  }
  contactNumberValidation() {
    this.service.phoneNumberExists(this.contactNumber);
  }
  get submitted(): boolean {
    return this.userRegisterFormSubmit;
  }
  get form() {
    return this.userRegisterForm.controls;
  }
  back() {
    this.logService.debug("Back button clicked");
    this.router.navigate(["/admin/user/table"]);
  }
  reset() {
    this.logService.debug("Reset Button Clicked");
    this.userRegisterForm.reset();
  }

  formOnSubmit() {
    this.userRegisterFormSubmit = true;
    if (this.userRegisterForm.invalid) {
      Swal.fire({
        icon: "error",
        title: "Check again!",
        text: "Kindly check all fields before submitting",
        customClass: {
          confirmButton: "btn btn-warning",
        },
      });
      return;
    }
    this.blockUI.start("Loading...");
    this.logService.debug("SUCCESS data received");
    let user = this.userRegisterForm.value;
    this.logService.debug("Processing....." + JSON.stringify(user));
    // delete user.confPassword;

    this.value = this.service.regUser(user);

    this.logService.debug(this.value);
    if (this.value.complete) {
      this.userRegisterForm.reset();
      this.userRegisterFormSubmit = false;
      this.blockUI.stop();
      Swal.fire({
        icon: "success",
        title: "Successfully Registered!",
        text: "Kindly check your email for further details.",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
      this.router.navigate(["/home"]);
      // this.router.navigate(['/contactUs']);
    } else {
      this.userRegisterFormSubmit = true;
    }
  }
  onRadioChange(gender: string) {
    this.userRegisterForm.value.gender = gender;
  }
}
