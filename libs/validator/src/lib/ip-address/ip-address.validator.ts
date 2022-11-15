import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const PATTERN = /^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/;
export const IPAddressValidator: () => ValidatorFn = () => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    return !value
      ? null
      : !PATTERN.test(value) ||
        !value.split('.').every((num) => Number(num) <= 255)
      ? { ipAddress: true }
      : null;
  };
};

export default IPAddressValidator;
