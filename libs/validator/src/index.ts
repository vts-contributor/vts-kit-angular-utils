import ViettelMailValidator from './lib/viettel-mail/viettel-mail.validator';
import IPAddressValidator from './lib/ip-address/ip-address.validator';
import IPAddressPortValidator from './lib/ip-address-port/ip-address-port.validator';
import NumberValidator from './lib/number/number.validator';
import URLValidator from './lib/url/url.validator';

export const VTSValidators = {
  viettelMail: ViettelMailValidator(),
  ipAddress: IPAddressValidator(),
  ipAddressPort: IPAddressPortValidator(),
  number: NumberValidator,
  url: URLValidator(),
};

export * from './lib/validator.module';
export * from './lib/viettel-mail/viettel-mail.directive';
export * from './lib/ip-address/ip-address.directive';
export * from './lib/ip-address-port/ip-address-port.directive';
export * from './lib/number/number.directive';
export * from './lib/url/url.directive';
