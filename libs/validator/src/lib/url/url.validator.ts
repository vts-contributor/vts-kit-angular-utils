import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const PATTERN =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
export const URLValidator: () => ValidatorFn = () => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) return null;

    if (!PATTERN.test(value)) return { url: true };

    try {
      const url = new URL(value);
      return null;
    } catch {
      return { url: true };
    }
  };
};

export default URLValidator;
