import type { ICoordinate } from './coordinate'
import type { IParticle } from './particle'
import type { ITarget } from './target'

export interface ISwarm {
  particles: Array<IParticle>
  bestPosition: ICoordinate
  bestCost: number
  averageCost: number
  target: ITarget
}
