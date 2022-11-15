import { Directive } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  Validator,
  NG_VALIDATORS,
} from '@angular/forms';
import { IPAddressPortValidator } from './ip-address-port.validator';

@Directive({
  selector: '[ipAddressPort][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IPAddressPortValidatorDirective,
      multi: true,
    },
  ],
})
export class IPAddressPortValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return IPAddressPortValidator()(control);
  }
}
