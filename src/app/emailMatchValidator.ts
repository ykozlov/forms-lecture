import {ValidatorFn, AbstractControl} from "@angular/forms";
export function emailMatchValidator(emailKey, confirmKey) :ValidatorFn{
  return (control: AbstractControl) => {
    const emailControl = control.get(emailKey);
    const confirmControl = control.get(confirmKey);

    if (!emailControl || !confirmControl) {
      return null;
    }

    if (!emailControl.value && !confirmControl.value) {
      return null;
    }

    return emailControl.value !== confirmControl.value ? {nomatch: true} : null;
  }
}
