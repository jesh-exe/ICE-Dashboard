import { FormGroup } from '@angular/forms';
export function dateofbirth(c: FormGroup): { invalid: true } | null{
  
  let chooseddate=c.get('dateOfBirth').value ;
    let currentDate = new Date();  
    if (c.get('dateOfBirth').errors && !c.get('dateOfBirth').errors.response) {
        return;
      }
    let newone = new Date(chooseddate.year,chooseddate.month-1,chooseddate.day,0,0,0,0);
    if(newone>currentDate){
      c.get('dateOfBirth').setErrors({ response: true });
    }
    else {
      return null
      }
  
  }
