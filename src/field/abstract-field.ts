import type { ICoordinate } from '../types/coordinate'
import type { IField } from '../types/field'
import type { IVelocity } from '../types/velocity'

export interface IBounce {
  coordinate: ICoordinate
  velocity: IVelocity
}
export abstract class AField implements IField {
  bounds!: Array<ICoordinate>

  abstract inField(coordinate: ICoordinate): boolean
  abstract bounce(coordinate: ICoordinate, velocity: IVelocity): IBounce
}
