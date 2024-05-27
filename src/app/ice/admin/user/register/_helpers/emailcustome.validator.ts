import { FormGroup } from '@angular/forms';
export function emailValidation(c: FormGroup): { invalid: true } | null {

    let emailvalid = c.get('email').value;
    if (emailvalid == "") {
        return null;
    }
    else {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(emailvalid)) {
            c.get('email').setErrors({ emailValidation: true });
            return;
        }
        else {
            return null
        }
    }
}
