# VTS Kit Angular Utilities (Common)

## Installation

```
npm install @vts-kit/angular-common
```

## Guideline

### Date

| No  | Function Name    | Description                                                | Output  |
| --- | ---------------- | ---------------------------------------------------------- | ------- |
| 1   | distance         | Return a distance between two dates in miliseconds         | number  |
| 2   | isGreater        | Return whether `date1` is greater than `date2`             | boolean |
| 3   | isGreaterOrEqual | Return whether `date1` is greater than or equal to `date2` | boolean |
| 4   | isSmaller        | Return whether `date1` is smaller than `date2`             | boolean |
| 5   | isSmallerOrEqual | Return whether `date1` is smaller than or equal to `date2` | boolean |

### String

| No  | Function Name | Description                                                                                         | Output  |
| --- | ------------- | --------------------------------------------------------------------------------------------------- | ------- |
| 1   | isNullOrEmpty | Return whether a string is null or empty                                                            | boolean |
| 2   | defaultValue  | Return `defaultValue` if `value` is null or empty, else return `value`                              | string  |
| 3   | upperFirst    | Return `value` with first character is setted to be uppercase                                       | string  |
| 4   | lowerFirst    | Return `value` with first character is setted to be lowercase                                       | string  |
| 5   | camelCase     | Converts `value` to camel case                                                                      | string  |
| 6   | pascalCase    | Converts `value` to pascal case                                                                     | string  |
| 7   | kebabCase     | Converts `value` to kebab case                                                                      | string  |
| 8   | snakeCase     | Converts `value` to snake case                                                                      | string  |
| 9   | capitalize    | Converts the first character of first word in `value` to upper case and the remaining to lower case | string  |
| 10  | capitalizeAll | Converts the first character of each word in `value` to upper case and the remaining to lower case  | string  |

### Path

| No  | Function Name | Description                     | Output |
| --- | ------------- | ------------------------------- | ------ |
| 1   | getExtName    | Return extension of the path    | string |
| 2   | getDirName    | Return dir of the path          | string |
| 3   | getBaseName   | Return last portion of the path | string |

