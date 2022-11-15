import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const PATTERN = /([a-zA-Z0-9])@viettel.com.vn$/;
export const ViettelMailValidator: () => ValidatorFn = () => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    return !value || PATTERN.test(value) ? null : { viettelMail: true };
  };
};

export default ViettelMailValidator;
