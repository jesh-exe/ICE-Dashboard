import { address } from './address';
import { date } from './date';
import { Name } from './name';

export class UserEdit {
  id: string;
  userName:string;
  name:Name;
  email: string;
  dateOfBirth:date;
  gender:string;
  contactNumber:number;
  address:address;
}
