import type { ICoordinate } from '../types/coordinate'
import type { ISwarm } from '../types/swarm'
import type { ITarget } from '../types/target'
import type { AField } from './abstract-field'
import type { Particle } from './particle'

export class Swarm implements ISwarm {
  particles: Particle[] = []
  readonly target: ITarget
  readonly field: AField

  constructor(target: ITarget, field: AField) {
    this.target = target
    this.field = field
  }

  addParticle(particle: Particle) {
    this.particles.push(particle)
  }

  move() {
    const bestPosition = this.bestPosition
    for (const particle of this.particles) {
      particle.move(bestPosition)
    }
  }

  get bestPosition(): ICoordinate {
    if (this.particles.length === 0) {
      return this.target
    }

    return this.particles.reduce((best, particle) => {
      return particle.bestCost < best.bestCost ? particle : best
    }).bestPosition
  }

  get averagePosition(): ICoordinate {
    if (this.particles.length === 0) {
      return this.target // Or throw an error, or return a default based on context
    }

    const dimensions = this.particles[0].position.length
    const sum: number[] = new Array(dimensions).fill(0)

    for (const particle of this.particles) {
      for (let dim = 0; dim < particle.position.length; dim++) {
        sum[dim] += particle.position[dim]
      }
    }

    return sum.map((value) => value / this.particles.length) as ICoordinate
  }

  get bestCost(): number {
    if (this.particles.length === 0) {
      return Number.POSITIVE_INFINITY
    }
    return Math.min(...this.particles.map((particle) => particle.bestCost))
  }

  get averageCost(): number {
    if (this.particles.length === 0) {
      return Number.POSITIVE_INFINITY
    }
    const totalCost = this.particles.reduce(
      (sum, particle) => sum + particle.bestCost,
      0
    )
    return totalCost / this.particles.length
  }
}
