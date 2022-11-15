import { Directive } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  Validator,
  NG_VALIDATORS,
} from '@angular/forms';
import { IPAddressValidator } from './ip-address.validator';

@Directive({
  selector: '[ipAddress][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IPAddressValidatorDirective,
      multi: true,
    },
  ],
})
export class IPAddressValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return IPAddressValidator()(control);
  }
}
