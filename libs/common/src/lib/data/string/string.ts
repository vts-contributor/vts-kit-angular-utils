import { words } from './word';
export { words } from './word';

/**
 * Check whether a string is null or empty
 *
 * @example
 *
 * isNullOrEmpty(null)
 * => true
 *
 * isNullOrEmpty('')
 * => true
 *
 * isNullOrEmpty(undefined)
 * => true
 *
 * isNullOrEmpty("foo")
 * => false
 *
 */
export const isNullOrEmpty = (value?: string | null) => {
  return !value;
};

/**
 * Check `defaultValue` if `value` is null or empty, else return `value`
 *
 * @example
 *
 * defaultValue(null)
 * => ''
 *
 * defaultValue('', 'foo')
 * => 'foo'
 *
 */
export const defaultValue = (
  value?: string | null,
  defaultValue: string = ''
) => {
  return isNullOrEmpty(value) ? defaultValue : value!;
};

/**
 * Check `value` with first character is setted to be uppercase
 *
 * @example
 *
 * upperFirst('foo')
 * => 'Foo'
 *
 * upperFirst('fOO')
 * => 'FOO'
 *
 * upperFirst('FOO')
 * => 'FOO'
 *
 */
export const upperFirst = (value?: string | null) => {
  const val = defaultValue(value);
  return val.charAt(0).toUpperCase() + val.slice(1);
};

/**
 * Check `value` with first character is setted to be uppercase
 *
 * @example
 *
 * lowerFirst('Foo')
 * => 'foo'
 *
 * lowerFirst('FOO')
 * => 'fOO'
 *
 */
export const lowerFirst = (value?: string | null) => {
  const val = defaultValue(value);
  return val.charAt(0).toLowerCase() + val.slice(1);
};

/**
 * Converts `value` to camel case
 *
 * @example
 *
 * camelCase('Foo Bar')
 * => 'fooBar'
 *
 * camelCase('--foo-bar--')
 * => 'fooBar'
 *
 * camelCase('__FOO_BAR__')
 * => 'fooBar'
 *
 */
export const camelCase = (value?: string | null) => {
  return words(defaultValue(value).replace(/['\u2019]/g, '')).reduce(
    (result, word, index) => {
      word = word.toLowerCase();
      return result + (index ? upperFirst(word) : word);
    },
    ''
  );
};

/**
 * Converts `value` to pascal case
 *
 * @example
 *
 * pascalCase('Foo Bar')
 * => 'FooBar'
 *
 * pascalCase('--foo-bar--')
 * => 'FooBar'
 *
 * pascalCase('__FOO_BAR__')
 * => 'FooBar'
 *
 */
export const pascalCase = (value?: string | null) => {
  return upperFirst(camelCase(value));
};

/**
 * Converts `value` to kebab case
 *
 * @example
 *
 * kebabCase('Foo Bar')
 * => 'foo-bar'
 *
 * kebabCase('--foo-bar--')
 * => 'foo-bar'
 *
 * kebabCase('__FOO_BAR__')
 * => 'foo-bar'
 *
 */
export const kebabCase = (value?: string | null) => {
  return words(defaultValue(value).replace(/['\u2019]/g, '')).reduce(
    (result, word, index) => result + (index ? '-' : '') + word.toLowerCase(),
    ''
  );
};

/**
 * Converts `value` to snake case
 *
 * @example
 *
 * snakeCase('Foo Bar')
 * => 'foo_bar'
 *
 * snakeCase('--foo-bar--')
 * => 'foo_bar'
 *
 * snakeCase('__FOO_BAR__')
 * => 'foo_bar'
 *
 */
export const snakeCase = (value?: string | null) => {
  return words(defaultValue(value).replace(/['\u2019]/g, '')).reduce(
    (result, word, index) => result + (index ? '_' : '') + word.toLowerCase(),
    ''
  );
};

/**
 * Converts the first character of first word in `value` to upper case and the remaining to lower case.
 *
 * @example
 *
 * capitalizeAll('foo bar')
 * => 'Foo bar'
 *
 * capitalizeAll('foo_bar')
 * => 'Foo bar'
 *
 * capitalizeAll('--foo-bar--')
 * => 'Foo bar'
 *
 */
export const capitalize = (value?: string | null) => {
  return words(defaultValue(value).replace(/['\u2019]/g, '')).reduce(
    (result, word, index) =>
      result +
      (index ? ' ' : '') +
      (index ? word : upperFirst(word.toLowerCase())),
    ''
  );
};

/**
 * Converts the first character of each word in `value` to upper case and the remaining to lower case.
 *
 * @example
 *
 * capitalizeAll('foo bar')
 * => 'Foo Bar'
 *
 * capitalizeAll('foo_bar')
 * => 'Foo Bar'
 *
 * capitalizeAll('--foo-bar--')
 * => 'Foo Bar'
 *
 */
export const capitalizeAll = (value?: string | null) => {
  return words(defaultValue(value).replace(/['\u2019]/g, '')).reduce(
    (result, word, index) =>
      result + (index ? ' ' : '') + upperFirst(word.toLowerCase()),
    ''
  );
};
