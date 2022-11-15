import { NgModule } from '@angular/core';
import { ViettelMailValidatorDirective } from './viettel-mail/viettel-mail.directive';
import { IPAddressPortValidatorDirective } from './ip-address-port/ip-address-port.directive';
import { IPAddressValidatorDirective } from './ip-address/ip-address.directive';
import { NumberValidatorDirective } from './number/number.directive';
import { URLValidatorDirective } from './url/url.directive';

const DECLARES = [
  ViettelMailValidatorDirective,
  IPAddressValidatorDirective,
  IPAddressPortValidatorDirective,
  NumberValidatorDirective,
  URLValidatorDirective,
];

@NgModule({
  declarations: [...DECLARES],
  exports: [...DECLARES],
})
export class VtsValidatorModule {}
