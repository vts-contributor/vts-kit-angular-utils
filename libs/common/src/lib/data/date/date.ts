/**
 * Return a distance between two dates in miliseconds
 *
 */
export const distance = (date1: Date, date2: Date) => {
  return date1.getTime() - date2.getTime();
};

/**
 * Return whether `date1` is greater than `date2`
 *
 */
export const isGreater = (date1: Date, date2: Date) => {
  return distance(date1, date2) > 0;
};

/**
 * Return whether `date1` is greater than or equal to `date2`
 *
 */
export const isGreaterOrEqual = (date1: Date, date2: Date) => {
  return distance(date1, date2) >= 0;
};

/**
 * Return whether `date1` is smaller than `date2`
 *
 */
export const isSmaller = (date1: Date, date2: Date) => {
  return distance(date1, date2) < 0;
};

/**
 * Return whether `date1` is smaller than or equal to `date2`
 *
 */
export const isSmallerOrEqual = (date1: Date, date2: Date) => {
  return distance(date1, date2) <= 0;
};
