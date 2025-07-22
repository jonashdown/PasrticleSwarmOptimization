import { nanoid } from 'nanoid'
import { validateCoordinate } from '../functions/ICoordinate/validate-coordinate'
import { validateVelocity } from '../functions/IVelocity/validate-velocity'
import type { ICoordinate } from '../types/coordinate'
import type { IParticle } from '../types/particle'
import type { IVelocity } from '../types/velocity'
import type { AEdgeDetector } from './abstract-edge-detector'
import type { ATargetDetector } from './abstract-target-detector'

export class Particle implements IParticle {
  position: ICoordinate = [] as unknown as ICoordinate
  velocity: IVelocity = [] as unknown as IVelocity
  bestPosition: ICoordinate = [] as unknown as ICoordinate
  bestCost: number = Number.POSITIVE_INFINITY
  id = nanoid()
  private targetDetector: ATargetDetector
  private clampFactor = 0.2
  private edgeDetector: AEdgeDetector
  private cognitiveCoefficient: number
  private socialCoefficient: number
  private inertiaWeight: number

  //needs a position, velocity, edge & target detector
  constructor(
    position: ICoordinate,
    velocity: IVelocity,
    targetDetector: ATargetDetector,
    edgeDetector: AEdgeDetector
  ) {
    this.position = validateCoordinate(position)
    this.velocity = validateVelocity(velocity)
    this.targetDetector = targetDetector
    this.edgeDetector = edgeDetector
    this.cognitiveCoefficient = Math.random()
    this.socialCoefficient = Math.random()
    this.inertiaWeight = Math.random()
    this.updateBestPosition()
  }

  //should live somewhere else
  // private randomPosition() {
  //   do {
  //     for (let i = 0; i < this.dimensions; i++) {
  //       this.position[i] = random.float(-this.fieldSize, this.fieldSize)
  //     }
  //   } while (!this.edgeDetector.isInBounds(this.position))
  // }

  // //should live somewhere else
  // private randomVelocity() {
  //   for (let i = 0; i < this.dimensions; i++) {
  //     this.velocity[i] =
  //       random.float(-this.fieldSize, this.fieldSize) -
  //       (this.fieldSize / this.dimensions) * 0.1
  //   }
  // }

  get data(): IParticle {
    return {
      id: this.id,
      position: this.position,
      velocity: this.velocity,
      bestPosition: this.bestPosition,
      bestCost: this.bestCost
    }
  }

  move(bestPosition: ICoordinate) {
    this.updateVelocity(bestPosition)
    this.updatePosition()
    this.updateBestPosition()
  }

  private updateVelocity(bestPosition: ICoordinate) {
    this.velocity = bestPosition.map((ordinate, dimension) =>
      this.calculateVelocity(ordinate, dimension)
    ) as IVelocity
  }

  private calculateVelocity(ordinate: number, dimension: number): number {
    const cognitiveVelocity =
      this.cognitiveCoefficient *
      Math.random() *
      (ordinate - this.position[dimension])
    const socialVelocity =
      this.socialCoefficient *
      Math.random() *
      (ordinate - this.position[dimension])
    const velocity =
      this.inertiaWeight * this.velocity[dimension] +
      cognitiveVelocity +
      socialVelocity
    const clamp = this.edgeDetector.calculateClamp(this.clampFactor)

    return Math.max(-clamp, Math.min(clamp, velocity))
  }

  private updatePosition() {
    const position = this.position.map(
      (ordinate, dimension) => ordinate + this.velocity[dimension]
    ) as ICoordinate
    if (this.edgeDetector.isInBounds(position)) {
      this.position = position
    } else {
      const { bouncedPosition, bouncedVelocity } = this.edgeDetector.bounce(
        this.position,
        this.velocity
      )
      this.position = bouncedPosition
      this.velocity = bouncedVelocity
    }
    this.updateBestPosition()
  }

  private updateBestPosition() {
    const cost = this.targetDetector.distanceToTarget(this.position)
    if (this.bestCost > cost) {
      this.bestPosition = [...this.position]
      this.bestCost = cost
    }
  }
}
