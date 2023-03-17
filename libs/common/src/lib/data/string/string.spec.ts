import { StringUtils } from '@vts-kit/angular-common';

it('isNullOrEmpty', () => {
  expect(StringUtils.isNullOrEmpty(null)).toEqual(true);
  expect(StringUtils.isNullOrEmpty(undefined)).toEqual(true);
  expect(StringUtils.isNullOrEmpty('')).toEqual(true);
  expect(StringUtils.isNullOrEmpty('foo')).toEqual(false);
});

it('defaultValue', () => {
  expect(StringUtils.defaultValue(null)).toEqual('');
  expect(StringUtils.defaultValue('', 'foo')).toEqual('foo');
});

it('upperFirst', () => {
  expect(StringUtils.upperFirst('foo')).toEqual('Foo');
  expect(StringUtils.upperFirst('fOO')).toEqual('FOO');
  expect(StringUtils.upperFirst('FOO')).toEqual('FOO');
});

it('lowerFirst', () => {
  expect(StringUtils.lowerFirst('Foo')).toEqual('foo');
  expect(StringUtils.lowerFirst('FOO')).toEqual('fOO');
});

it('camelCase', () => {
  expect(StringUtils.camelCase('Foo Bar')).toEqual('fooBar');
  expect(StringUtils.camelCase('--foo-bar--')).toEqual('fooBar');
  expect(StringUtils.camelCase('__FOO_BAR__')).toEqual('fooBar');
});

it('pascalCase', () => {
  expect(StringUtils.pascalCase('Foo Bar')).toEqual('FooBar');
  expect(StringUtils.pascalCase('--foo-bar--')).toEqual('FooBar');
  expect(StringUtils.pascalCase('__FOO_BAR__')).toEqual('FooBar');
});

it('kebabCase', () => {
  expect(StringUtils.kebabCase('Foo Bar')).toEqual('foo-bar');
  expect(StringUtils.kebabCase('--foo-bar--')).toEqual('foo-bar');
  expect(StringUtils.kebabCase('__FOO_BAR__')).toEqual('foo-bar');
});

it('snakeCase', () => {
  expect(StringUtils.snakeCase('Foo Bar')).toEqual('foo_bar');
  expect(StringUtils.snakeCase('--foo-bar--')).toEqual('foo_bar');
  expect(StringUtils.snakeCase('__FOO_BAR__')).toEqual('foo_bar');
});

it('capitalize', () => {
  expect(StringUtils.capitalize('foo bar')).toEqual('Foo bar');
  expect(StringUtils.capitalize('foo_bar')).toEqual('Foo bar');
  expect(StringUtils.capitalize('--foo-bar--')).toEqual('Foo bar');
});

it('capitalizeAll', () => {
  expect(StringUtils.capitalizeAll('foo bar')).toEqual('Foo Bar');
  expect(StringUtils.capitalizeAll('foo_bar')).toEqual('Foo Bar');
  expect(StringUtils.capitalizeAll('--foo-bar--')).toEqual('Foo Bar');
});
