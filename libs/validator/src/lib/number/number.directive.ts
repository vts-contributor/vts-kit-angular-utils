import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  Validator,
  NG_VALIDATORS,
} from '@angular/forms';
import { NumberValidator } from './number.validator';

@Directive({
  selector: '[number][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NumberValidatorDirective,
      multi: true,
    },
  ],
})
export class NumberValidatorDirective implements Validator {
  @Input('numberType') numberType: 'integer' | 'float' | 'any' = 'any';
  @Input('larger') larger?: number;
  @Input('largerOrEqual') largerOrEqual?: number;
  @Input('smaller') smaller?: number;
  @Input('smallerOrEqual') smallerOrEqual?: number;

  validate(control: AbstractControl): ValidationErrors | null {
    return NumberValidator({
      numberType: this.numberType,
      larger: this.larger,
      largerOrEqual: this.largerOrEqual,
      smaller: this.smaller,
      smallerOrEqual: this.smallerOrEqual,
    })(control);
  }
}
