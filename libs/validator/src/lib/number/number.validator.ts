import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

type NumberValidatorOptions = {
  numberType?: 'integer' | 'float' | 'any';
  larger?: number;
  smaller?: number;
  largerOrEqual?: number;
  smallerOrEqual?: number;
};

const defaultOptions = {
  numberType: 'any',
};

type ErrorType = {
  number?: boolean;
  numberType?: boolean;
  numberLarger?: boolean;
  numberLargerOrEqual?: boolean;
  numberSmaller?: boolean;
  numberSmallerOrEqual?: boolean;
};

export const NumberValidator: (opts?: NumberValidatorOptions) => ValidatorFn = (
  opts
) => {
  const options = Object.assign(defaultOptions, opts || {});

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) return null;

    const errors: ErrorType = {};

    if (!/[0-9]$/.test(value) || Number.isNaN(Number(value)))
      errors.number = true;
    else {
      const num = Number(value);
      if (options.numberType) {
        switch (options.numberType) {
          case 'float':
            errors.numberType = num % 1 == 0;
            break;
          case 'integer':
            errors.numberType = num % 1 != 0;
            break;
          default:
            break;
        }
      }

      if (options.larger != undefined)
        errors.numberLarger = !(num > options.larger);

      if (options.largerOrEqual != undefined)
        errors.numberLargerOrEqual = !(num >= options.largerOrEqual);

      if (options.smaller != undefined)
        errors.numberSmaller = !(num < options.smaller);

      if (options.smallerOrEqual != undefined)
        errors.numberSmallerOrEqual = !(num <= options.smallerOrEqual);
    }

    Object.keys(errors).forEach((k) => {
      if (!(errors as any)[k]) delete (errors as any)[k];
    });
    return Object.keys(errors).length == 0 ? null : errors;
  };
};

export default NumberValidator;
