import {  FormGroup } from '@angular/forms';

  export function mustMatch(c: FormGroup): { invalid: true } | null{

    if (c.get('password').value !== c.get('confPassword').value) {

    c.get('confPassword').setErrors({ mustMatch: true });
    
    }
    
    return null
    
    }
    
    
