import type { ICoordinate } from '../../types/coordinate'

export const validateCoordinate = (coordinate: unknown): ICoordinate => {
  if (
    coordinate &&
    Array.isArray(coordinate) &&
    coordinate?.length &&
    coordinate.every((value) => typeof value === 'number')
  ) {
    return [...coordinate] as ICoordinate
  }
  throw new TypeError('coordinate must be a numerical array')
}
