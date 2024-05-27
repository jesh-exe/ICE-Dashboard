import { Role } from "app/auth/models/Role";
import { address } from "./address";
import { date } from "./date";
import { Name } from "./name";

export class UserProfile {
  userName: string;
  name: Name;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: date;
  address: address;
  contactNumber: number;
  role: string[];
}
