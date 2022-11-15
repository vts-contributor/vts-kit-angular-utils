import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const PATTERN =
  /^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\:([0-9]{1,5})$/;
export const IPAddressPortValidator: () => ValidatorFn = () => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) return null;

    if (!PATTERN.test(value)) return { ipAddressPort: true };
    const [ip, port] = value.split(':');
    return !ip.split('.').every((num) => Number(num) <= 255) ||
      Number(port) > 65535
      ? { ipAddressPort: true }
      : null;
  };
};

export default IPAddressPortValidator;
