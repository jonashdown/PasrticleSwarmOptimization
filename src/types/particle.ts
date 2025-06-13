import type { ICoordinate } from './coordinate'
import type { IVelocity } from './velocity'

export interface IParticle {
  id: string
  position: ICoordinate
  velocity: IVelocity
  bestPosition: ICoordinate
  bestCost: number
}
