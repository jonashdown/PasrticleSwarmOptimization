import { beforeEach, describe, expect, it, mock } from 'bun:test'
import type { ICoordinate } from '../coordinate/coordinate.types'
import type { AField } from '../field/abstract-field'
import {
  EdgeDetectorBuilder,
  FieldBuilder,
  ParticleBuilder,
  TargetDetectorBuilder
} from '../fixtures/data-builder'
import { Particle } from '../particle/particle'
import type { ITarget } from '../target/target.types'
import { Swarm } from './swarm'

describe('Swarm', () => {
  let swarm: Swarm
  let target: ITarget
  let field: AField

  beforeEach(() => {
    target = [10, 10]
    field = new FieldBuilder()
      .with('bounds', [
        [0, 0],
        [100, 0],
        [100, 100],
        [0, 100]
      ])
      .build()
    swarm = new Swarm(target, field)
  })

  it('should be instantiated with a target and a field', () => {
    expect(swarm.target).toEqual(target)
    expect(swarm.field).toEqual(field)
  })

  it('should add a particle', () => {
    const particle = new ParticleBuilder()
      .with('id', '1')
      .with('position', [5, 5, 5])
      .with('velocity', [1, 1, 1])
      .with('bestPosition', [5, 5, 5])
      .with('bestCost', 0)
      .build()
    swarm.addParticle(particle)
    expect(swarm.particles).toHaveLength(1)
    expect(swarm.particles[0]).toEqual(particle)
  })

  describe('with particles', () => {
    let particle1: Particle
    let particle2: Particle

    beforeEach(() => {
      const mockTargetDetector = new TargetDetectorBuilder().build()
      const mockEdgeDetector = new EdgeDetectorBuilder().build()

      particle1 = new Particle(
        [5, 5, 5],
        [1, 1, 1],
        mockTargetDetector,
        mockEdgeDetector
      )
      particle1.id = '1'
      particle1.bestCost = 10
      particle1.bestPosition = [5, 5, 5]
      particle1.move = mock()

      particle2 = new Particle(
        [15, 15, 15],
        [-1, -1, -1],
        mockTargetDetector,
        mockEdgeDetector
      )
      particle2.id = '2'
      particle2.bestCost = 5
      particle2.bestPosition = [15, 15, 15]
      particle2.move = mock()

      swarm.addParticle(particle1)
      swarm.addParticle(particle2)
    })

    it('should return the best position', () => {
      expect(swarm.bestPosition).toEqual(particle2.bestPosition)
    })

    it('should return the average position', () => {
      const mockTargetDetector = new TargetDetectorBuilder().build()
      const mockEdgeDetector = new EdgeDetectorBuilder().build()
      const particle3 = new Particle(
        [20, 20, 20],
        [0, 0, 0],
        mockTargetDetector,
        mockEdgeDetector
      )
      particle3.id = '3'
      particle3.bestCost = 15
      particle3.bestPosition = [20, 20, 20]
      swarm.addParticle(particle3)
      expect(swarm.averagePosition).toEqual([
        13.333333333333334, 13.333333333333334, 13.333333333333334
      ])
    })

    it('should return the best cost', () => {
      expect(swarm.bestCost).toBe(5)
    })

    it('should return the average cost', () => {
      expect(swarm.averageCost).toBe(7.5)
    })

    it('should move all particles', () => {
      swarm.move()
      expect(particle1.move).toHaveBeenCalledWith(swarm.bestPosition)
      expect(particle2.move).toHaveBeenCalledWith(swarm.bestPosition)
    })
  })
})
