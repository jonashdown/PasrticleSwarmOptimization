export const range = (size: number): Array<number> => {
  if (size < 1) {
    throw new RangeError('Range must be greater than zero')
  }

  if (!Number.isInteger(size)) {
    throw new RangeError('Range must be a positive integer')
  }

  return [...Array(size).keys()]
}
