import type { ICoordinate } from './coordinate'
import type { IParticle } from './particle'

export interface ISwarm {
  particles: Array<IParticle>
  bounds: Array<ICoordinate>
  bestPosition: ICoordinate
  bestCost: number
}
