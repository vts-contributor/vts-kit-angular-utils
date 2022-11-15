import { Directive } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  Validator,
  NG_VALIDATORS,
} from '@angular/forms';
import { URLValidator } from './url.validator';

@Directive({
  selector: '[url][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: URLValidatorDirective, multi: true },
  ],
})
export class URLValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return URLValidator()(control);
  }
}
