import { mock } from 'bun:test'
import type { AEdgeDetector } from '../classes/abstract-edge-detector'
import type { AField } from '../classes/abstract-field'
import type { ATargetDetector } from '../classes/abstract-target-detector'
import type { ICoordinate } from '../types/coordinate'
import type { IParticle } from '../types/particle'
import type { ISwarm } from '../types/swarm'
import type { ITarget } from '../types/target'
import type { IVelocity } from '../types/velocity'

export abstract class DataBuilder<T> {
  data!: Partial<T>

  with<K extends keyof T>(k: K, v: T[K] | undefined) {
    this.data[k] = v
    return this
  }
}

export class SwarmBuilder extends DataBuilder<ISwarm> {
  constructor() {
    super()
    this.data = {
      particles: [],
      bestPosition: [0, 0],
      bestCost: 0,
      averageCost: 0,
      target: [0, 0]
    }
  }

  build() {
    return this.data as ISwarm
  }
}

export class ParticleBuilder extends DataBuilder<IParticle> {
  constructor() {
    super()
    this.data = {
      id: 'mock-particle',
      position: [0, 0],
      velocity: [0, 0],
      bestPosition: [0, 0],
      bestCost: 0
    }
  }

  build() {
    return this.data as IParticle
  }
}

export class TargetDetectorBuilder extends DataBuilder<ATargetDetector> {
  constructor() {
    super()
    this.data = {
      distanceToTarget: mock(() => 0),
      isAtTarget: mock(() => false)
    }
  }

  build() {
    return this.data as ATargetDetector
  }
}

export class EdgeDetectorBuilder extends DataBuilder<AEdgeDetector> {
  constructor() {
    super()
    this.data = {
      calculateClamp: mock(() => 0),
      isInBounds: mock(() => true),
      bounce: mock((coordinate: ICoordinate, velocity: IVelocity) => ({
        bouncedPosition: coordinate,
        bouncedVelocity: velocity
      }))
    }
  }

  build() {
    return this.data as AEdgeDetector
  }
}

export class FieldBuilder extends DataBuilder<AField> {
  constructor() {
    super()
    this.data = {
      bounds: [],
      inField: mock(() => true),
      bounce: mock((coordinate: ICoordinate, velocity: IVelocity) => ({
        coordinate,
        velocity
      }))
    }
  }

  build() {
    return this.data as AField
  }
}
