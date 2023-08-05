import {UntypedFormControl} from '@angular/forms';

export function amountValidator(control: UntypedFormControl): { [key: string]: boolean } {
  const valid = /^[1-9]+[0-9]*$/.test(control.value);
  return valid ? null : {invalidAmount: false};
}
