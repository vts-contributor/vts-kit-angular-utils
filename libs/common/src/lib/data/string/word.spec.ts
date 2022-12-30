import { words } from './word';

it('case 1', () => {
  expect(words('some, thing, & here')).toStrictEqual(['some', 'thing', 'here']);
  expect(words('some, thing, & here', /[^, ]+/g)).toStrictEqual([
    'some',
    'thing',
    '&',
    'here',
  ]);
});
