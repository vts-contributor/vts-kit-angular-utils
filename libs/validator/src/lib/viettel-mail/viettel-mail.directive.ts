import { Directive } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  Validator,
  NG_VALIDATORS,
} from '@angular/forms';
import { ViettelMailValidator } from './viettel-mail.validator';

@Directive({
  selector: '[viettelMail][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ViettelMailValidatorDirective,
      multi: true,
    },
  ],
})
export class ViettelMailValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return ViettelMailValidator()(control);
  }
}
