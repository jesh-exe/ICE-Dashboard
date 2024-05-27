import { address } from "./address";
import { Name } from "./name";
import { date } from "./date";

export class UserView {
  id: string;
  userName: String;
  name: Name;
  email: string;
  address: address;
  dateOfBirth: date;
  gender: string;
  contactNumber: number;
  ActivatedDate: string;
  DeactivateDate: string;
  ActivatedBy: string;
  DeactivatedBy: string;
  userEnabled: boolean;
  permission: string;
}
