import type { IVelocity } from '../../types/velocity'

export const validateVelocity = (velocity: unknown): IVelocity => {
  if (
    velocity &&
    Array.isArray(velocity) &&
    velocity?.length &&
    velocity.every((value) => typeof value === 'number')
  ) {
    return [...velocity] as IVelocity
  }
  throw new TypeError('velocity must be a numerical array')
}
