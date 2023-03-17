import { DateUtils } from '@vts-kit/angular-common';

it('distance', () => {
  const date1 = new Date();
  date1.setMinutes(0);
  date1.setSeconds(0);
  date1.setMilliseconds(0);
  const date2 = new Date();
  date2.setMinutes(5);
  date2.setSeconds(0);
  date2.setMilliseconds(0);
  expect(DateUtils.distance(date1, date2)).toEqual(-5 * 60 * 1000);
});

it('isGreater', () => {
  const date1 = new Date();
  date1.setMinutes(0);
  date1.setSeconds(0);
  date1.setMilliseconds(0);
  const date2 = new Date();
  date2.setMinutes(5);
  date2.setSeconds(0);
  date2.setMilliseconds(0);
  expect(DateUtils.isGreater(date1, date1)).toEqual(false);
  expect(DateUtils.isGreater(date1, date2)).toEqual(false);
  expect(DateUtils.isGreater(date2, date1)).toEqual(true);
});

it('isGreaterOrEqual', () => {
  const date1 = new Date();
  date1.setMinutes(0);
  date1.setSeconds(0);
  date1.setMilliseconds(0);
  const date2 = new Date();
  date2.setMinutes(5);
  date2.setSeconds(0);
  date2.setMilliseconds(0);
  expect(DateUtils.isGreaterOrEqual(date1, date1)).toEqual(true);
  expect(DateUtils.isGreaterOrEqual(date1, date2)).toEqual(false);
  expect(DateUtils.isGreaterOrEqual(date2, date1)).toEqual(true);
});

it('isSmaller', () => {
  const date1 = new Date();
  date1.setMinutes(0);
  date1.setSeconds(0);
  date1.setMilliseconds(0);
  const date2 = new Date();
  date2.setMinutes(5);
  date2.setSeconds(0);
  date2.setMilliseconds(0);
  expect(DateUtils.isSmaller(date1, date1)).toEqual(false);
  expect(DateUtils.isSmaller(date1, date2)).toEqual(true);
  expect(DateUtils.isSmaller(date2, date1)).toEqual(false);
});

it('isSmallerOrEqual', () => {
  const date1 = new Date();
  date1.setMinutes(0);
  date1.setSeconds(0);
  date1.setMilliseconds(0);
  const date2 = new Date();
  date2.setMinutes(5);
  date2.setSeconds(0);
  date2.setMilliseconds(0);
  expect(DateUtils.isSmallerOrEqual(date1, date1)).toEqual(true);
  expect(DateUtils.isSmallerOrEqual(date1, date2)).toEqual(true);
  expect(DateUtils.isSmallerOrEqual(date2, date1)).toEqual(false);
});
