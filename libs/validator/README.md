# VTS Kit Angular Utilities (Validator)

## Installation

```
npm install @vts-kit/angular-validator
```

- For template-driven form:

```
import { VtsValidatorModule } from '@vts-kit/angular-validator';

@(NgModule | Component | ...)({
    imports: [VtsValidatorModule]
})
```

Check list of validators below and use corresponding directives and options.

- For reactive form:

```
import { VTSValidators } from '@vts-kit/angular-validator';

export class Component ... {
    // Use with 'validators' property of FormControl, FormGroup, FormBuilder, ...
    control = new FormBuilder().control('', {
        validators: [VTSValidators.url]
    })
}
```

Check list of validators below and use corresponding functions and options.

## Guideline

Quick guide:

- Template-driven Form

```
//// Without other options (Some validators don't have extra options)
// *.html
<input ngModel url  />

//// With options
// *.html
<input number [larger]="5" [smallerOrEqual]="10" #control="ngModel">

// You can see raise errors here
{{ control.errors | json }}
```

- Reactive Form

```
//// Without other options (Some validators don't have extra options)
// *.ts
control = new FormBuilder().control('', {
    validators: [VTSValidators.url]
})

// *.html
<input [formControl]="control" />

//// With options
// *.ts
control = new FormBuilder().control('', {
    validators: [
        VTSValidators.number({
          larger: 5,
          smallerOrEqual: 10
        })
    ]
})

// *.html
<input [formControl]="control" />

// You can see raise errors here
{{ control.errors | json }}
```

List of validators

- [Viettel Mail](#viettel-mail)
- [IP Address](#ip-address)
- [IP Address & Port](#ip-address--port)
- [Number](#number)
- [URL](#url)

### Viettel Mail

Validate if input is a valid Viettel Email (@viettel.com.vn)

- Directive (Template-driven Form): `viettelMail`
- Function (Reactive Form): `VTSValidators.viettelMail`
- Options: None
- Raise error: `viettelMail`

### IP Address

Validate if input is a valid IP address

- Directive (Template-driven Form): `ipAddress`
- Function (Reactive Form): `VTSValidators.ipAddress`
- Options: None
- Raise error: `ipAddress`

### IP Address & Port

Validate if input is a valid IP address and Port (\<ip\>:\<port\>)

- Directive (Template-driven Form): `ipAddressPort`
- Function (Reactive Form): `VTSValidators.ipAddressPort`
- Options: None
- Raise error: `ipAddressPort`

### Number

Validate if input is a valid number, number type (float, integer), larger, smaller

- Directive (Template-driven Form): `number`
- Function (Reactive Form): `VTSValidators.number`
- Options and raise errors:

| No  | Name             | Type                                   | Description                                                   | Raise error           |
| --- | ---------------- | -------------------------------------- | ------------------------------------------------------------- | --------------------- |
| 1   | `number`         | `boolean`                              | Check if input can be convert to number                       | `number`              |
| 2   | `numberType`     | `float` or `integer` or `any` (default | Check type of number                                          | `numberType`          |
| 3   | `larger`         | `number`                               | Check value of input is larger than given number              | `numberLarger`        |
| 4   | `largerOrEqual`  | `number`                               | Check value of input is larger than or equal to given number  | `numberLargerOrEqual` |
| 5   | `smaller`        | `number`                               | Check value of input is smaller than given number             | `smaller`             |
| 6   | `smallerOrEqual` | `number`                               | Check value of input is smaller than or equal to given number | `smallerOrEqual`      |

### URL

Validate if input is a valid URL

- Directive (Template-driven Form): `url`
- Function (Reactive Form): `VTSValidators.url`
- Options: None
- Raise error: `url`
