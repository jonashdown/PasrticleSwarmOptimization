import type { ICoordinate } from '../types/coordinate'
import type { IVelocity } from '../types/velocity'

export abstract class AEdgeDetector {
  abstract isOnEdge(coordinate: ICoordinate): boolean
  abstract isInBounds(coordinate: ICoordinate): boolean
  abstract goToEdge(coordinate: ICoordinate, velocity: IVelocity): ICoordinate
  abstract calculateClamp(clampFactor: number): number
  //this.clampFactor * (this.bounds[this.bounds.length - 1][index] - this.bounds[0][index])
  abstract bounce(
    coordinate: ICoordinate,
    velocity: IVelocity
  ): { bouncedPosition: ICoordinate; bouncedVelocity: IVelocity }
  // this.position = this.position.map((ordinate, dimension) => {
  //   const position = ordinate + this.velocity[dimension]
  //   if (position < this.bounds[dimension][0]) {
  //     this.velocity[dimension] *= -0.5
  //     return (
  //       this.bounds[dimension][0] +
  //       Math.random() *
  //         (this.bounds[dimension][this.dimensions - 1] - this.bounds[dimension][0]) *
  //         0.1
  //     )
  //   }
  //   if (position > this.bounds[dimension][this.dimensions - 1]) {
  //     this.velocity[dimension] *= -0.5
  //     return (
  //       this.bounds[dimension][this.dimensions - 1] -
  //       Math.random() *
  //         (this.bounds[dimension][this.dimensions - 1] - this.bounds[dimension][0]) *
  //         0.1
  //     )
  //   }
  //   return position
  // })
  protected bounds!: Array<ICoordinate>
}
