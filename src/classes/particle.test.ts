//@ts-nocheck
import {
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
  mock
} from 'bun:test'
import { random } from 'nanoid'
import { AEdgeDetector } from '../classes/abstract-edge-detector'
import { ATargetDetector } from '../classes/abstract-target-detector'
import { Particle } from '../classes/particle'

mock.module('Math', () => ({
  random: jest.fn().mockReturnValue(0.5)
}))

class TestTargetDetector extends ATargetDetector {
  distanceToTarget = jest.fn()
  isAtTarget = jest.fn()
}

class TestEdgeDetector extends AEdgeDetector {
  isOnEdge = jest.fn()
  isInBounds = jest.fn()
  goToEdge = jest.fn()
  calculateClamp = jest.fn()
  bounce = jest.fn()
}

describe('Particle', () => {
  let mockTargetDetector: ATargetDetector
  let mockEdgeDetector: AEdgeDetector

  beforeEach(() => {
    mockTargetDetector = new TestTargetDetector()
    mockEdgeDetector = new TestEdgeDetector()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should initialize with given parameters', () => {
    const position = [5, 6, 7]
    const velocity = [0.1, 0.2, 0.3]
    mockEdgeDetector.isInBounds.mockReturnValue(true)
    mockTargetDetector.distanceToTarget.mockReturnValue(42)

    const particle = new Particle(
      position,
      velocity,
      mockTargetDetector,
      mockEdgeDetector
    )

    expect(particle.data).toEqual({
      position: [5, 6, 7],
      velocity: [0.1, 0.2, 0.3],
      bestPosition: [5, 6, 7],
      bestCost: 42,
      id: expect.any(String)
    })
  })

  it('should update position and velocity within bounds', () => {
    const initialPosition = [1, 2]
    const initialVelocity = [0.5, -0.5]
    const bestPosition = [2, 3]
    mockEdgeDetector.isInBounds.mockReturnValue(true)
    mockEdgeDetector.calculateClamp.mockReturnValue(2)
    mockTargetDetector.distanceToTarget.mockReturnValue(10)

    const particle = new Particle(
      initialPosition,
      initialVelocity,
      mockTargetDetector,
      mockEdgeDetector
    )

    particle.move(bestPosition, 1, 1, 1)

    expect(particle.position).not.toEqual(initialPosition)
    expect(particle.velocity).not.toEqual(initialVelocity)
    expect(mockEdgeDetector.isInBounds).toHaveBeenCalled()
    expect(mockEdgeDetector.calculateClamp).toHaveBeenCalled()
  })

  it('should update best position and cost when improved', () => {
    const initialPosition = [1, 1]
    const initialVelocity = [0, 0]
    mockEdgeDetector.isInBounds.mockReturnValue(true)
    mockEdgeDetector.calculateClamp.mockReturnValue(2)

    // Initial cost is high, new cost is lower
    mockTargetDetector.distanceToTarget
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(10)

    const particle = new Particle(
      initialPosition,
      initialVelocity,
      mockTargetDetector,
      mockEdgeDetector
    )

    // Move to a new position with lower cost
    particle.move([2, 2], 1, 1, 1)

    expect(particle.bestCost).toBe(10)
    expect(particle.bestPosition).toEqual(particle.position)
  })

  it('should bounce and update when out of bounds', () => {
    const position = [1, 1]
    const velocity = [10, 10]
    mockEdgeDetector.isInBounds.mockReturnValueOnce(false).mockReturnValue(true)
    mockEdgeDetector.calculateClamp.mockReturnValue(100)
    const bouncedPosition = [0, 0]
    const bouncedVelocity = [-5, -5]
    mockEdgeDetector.bounce.mockReturnValue({
      bouncedPosition,
      bouncedVelocity
    })
    mockTargetDetector.distanceToTarget.mockReturnValue(5)

    const particle = new Particle(
      position,
      velocity,
      mockTargetDetector,
      mockEdgeDetector
    )

    particle.move([2, 2], 1, 1, 1)

    expect(particle.position).toEqual(bouncedPosition)
    expect(particle.velocity).toEqual(bouncedVelocity)
    expect(mockEdgeDetector.bounce).toHaveBeenCalled()
  })

  it('should not update best position if cost not improved', () => {
    const position = [1, 1]
    const velocity = [0, 0]
    mockEdgeDetector.isInBounds.mockReturnValue(true)
    mockEdgeDetector.calculateClamp.mockReturnValue(2)

    // Initial cost is 10, new cost is 20 (worse)
    mockTargetDetector.distanceToTarget
      .mockReturnValueOnce(10)
      .mockReturnValueOnce(20)

    const particle = new Particle(
      position,
      velocity,
      mockTargetDetector,
      mockEdgeDetector
    )
    const prevBestPosition = [...particle.bestPosition]
    const prevBestCost = particle.bestCost

    particle.move([2, 2], 1, 1, 1)

    expect(particle.bestPosition).toEqual(prevBestPosition)
    expect(particle.bestCost).toBe(prevBestCost)
  })

  it('should throw when initialized with an empty position', () => {
    const position = []
    const velocity = [1, 2]
    mockEdgeDetector.isInBounds.mockReturnValue(true)
    mockEdgeDetector.calculateClamp.mockReturnValue(1)
    mockTargetDetector.distanceToTarget.mockReturnValue(0)

    expect(() => {
      const particle = new Particle(
        position,
        velocity,
        mockTargetDetector,
        mockEdgeDetector
      )
      particle.move([], 1, 1, 1)
    }).toThrow()
  })

  it('should throw when initialized with empty velocity', () => {
    const position = [3.2, 2.1, 8]
    const velocity = []
    mockEdgeDetector.isInBounds.mockReturnValue(true)
    mockEdgeDetector.calculateClamp.mockReturnValue(1)
    mockTargetDetector.distanceToTarget.mockReturnValue(0)

    expect(() => {
      const particle = new Particle(
        position,
        velocity,
        mockTargetDetector,
        mockEdgeDetector
      )
      particle.move([], 1, 1, 1)
    }).toThrow()
  })
})
