import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
  mock
} from 'bun:test'
import type { AEdgeDetector } from '../classes/abstract-edge-detector'
import type { ATargetDetector } from '../classes/abstract-target-detector'
import {
  EdgeDetectorBuilder,
  TargetDetectorBuilder
} from '../fixtures/data-builder'
import { Particle } from './particle'

describe('Particle', () => {
  let mockTargetDetector: ATargetDetector
  let mockEdgeDetector: AEdgeDetector
  let originalMathRandom: () => number

  beforeAll(() => {
    originalMathRandom = Math.random // Store original
  })

  beforeEach(() => {
    Math.random = () => 0.5 // Override for each test
    mockTargetDetector = new TargetDetectorBuilder().build()
    mockEdgeDetector = new EdgeDetectorBuilder().build()
  })

  afterEach(() => {
    Math.random = originalMathRandom // Restore original
    jest.restoreAllMocks()
  })

  it('should initialize with given parameters', () => {
    const position = [5, 6, 7]
    const velocity = [0.1, 0.2, 0.3]
    mockEdgeDetector.isInBounds.mockReturnValue(true)
    mockTargetDetector.distanceToTarget.mockReturnValueOnce(42)

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
    mockEdgeDetector.bounce.mockReturnValue({
      bouncedPosition: [0, 0],
      bouncedVelocity: [0, 0]
    })
    mockEdgeDetector.calculateClamp.mockReturnValue(2)

    mockTargetDetector.distanceToTarget.mockReturnValueOnce(100) // Initial cost

    const particle = new Particle(
      initialPosition,
      initialVelocity,
      mockTargetDetector,
      mockEdgeDetector
    )

    mockTargetDetector.distanceToTarget.mockReturnValueOnce(50) // Cost after move

    particle.move(bestPosition)

    expect(particle.position[0]).toBeCloseTo(1.75)
    expect(particle.position[1]).toBeCloseTo(2.25)
    expect(particle.velocity[0]).toBeCloseTo(0.75)
    expect(particle.velocity[1]).toBeCloseTo(0.25)
    expect(mockEdgeDetector.isInBounds).toHaveBeenCalled()
    expect(mockEdgeDetector.calculateClamp).toHaveBeenCalled()
  })

  it('should update best position and cost when improved', () => {
    const initialPosition = [1, 1]
    const initialVelocity = [0, 0]
    mockEdgeDetector.isInBounds.mockReturnValue(true)
    mockEdgeDetector.bounce.mockReturnValue({
      bouncedPosition: [0, 0],
      bouncedVelocity: [0, 0]
    })
    mockEdgeDetector.calculateClamp.mockReturnValue(2)

    mockTargetDetector.distanceToTarget
      .mockReturnValueOnce(100) // Initial cost in constructor
      .mockReturnValueOnce(10) // Cost after move

    mockTargetDetector.distanceToTarget.mockReturnValueOnce(100) // Initial cost in constructor

    const particle = new Particle(
      initialPosition,
      initialVelocity,
      mockTargetDetector,
      mockEdgeDetector
    )

    mockTargetDetector.distanceToTarget.mockReturnValueOnce(10) // Cost after move

    particle.move([2, 2])

    expect(particle.bestCost).toBe(10)
    expect(particle.bestPosition[0]).toBeCloseTo(1.5)
    expect(particle.bestPosition[1]).toBeCloseTo(1.5)
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
    mockTargetDetector.distanceToTarget
      .mockReturnValueOnce(10) // Initial cost in constructor
      .mockReturnValueOnce(20) // Cost after move

    const particle = new Particle(
      position,
      velocity,
      mockTargetDetector,
      mockEdgeDetector
    )

    particle.move([2, 2])

    expect(particle.position).toEqual(bouncedPosition)
    expect(particle.velocity).toEqual(bouncedVelocity)
    expect(mockEdgeDetector.bounce).toHaveBeenCalled()
  })

  it('should not update best position if cost not improved', () => {
    const position = [1, 1]
    const velocity = [0, 0]
    mockEdgeDetector.isInBounds.mockReturnValue(true)
    mockEdgeDetector.bounce.mockReturnValue({
      bouncedPosition: [0, 0],
      bouncedVelocity: [0, 0]
    })
    mockEdgeDetector.calculateClamp.mockReturnValue(2)

    const particle = new Particle(
      position,
      velocity,
      mockTargetDetector,
      mockEdgeDetector
    )
    const prevBestPosition = [...particle.bestPosition]
    const prevBestCost = particle.bestCost

    mockTargetDetector.distanceToTarget
      .mockReturnValueOnce(10) // Initial cost in constructor
      .mockReturnValueOnce(20) // Cost after move

    particle.move([2, 2])
  })

  it('should throw when initialized with an empty position', () => {
    const position = []
    const velocity = [1, 2]
    mockEdgeDetector.isInBounds.mockReturnValue(true)
    mockEdgeDetector.bounce.mockReturnValue({
      bouncedPosition: [0, 0],
      bouncedVelocity: [0, 0]
    })
    mockEdgeDetector.calculateClamp.mockReturnValue(1)
    mockTargetDetector.distanceToTarget.mockReturnValue(0)

    expect(() => {
      const particle = new Particle(
        position,
        velocity,
        mockTargetDetector,
        mockEdgeDetector
      )
      particle.move([])
    }).toThrow()
  })

  it('should throw when initialized with empty velocity', () => {
    const position = [3.2, 2.1, 8]
    const velocity = []
    mockEdgeDetector.isInBounds.mockReturnValue(true)
    mockEdgeDetector.bounce.mockReturnValue({
      bouncedPosition: [0, 0],
      bouncedVelocity: [0, 0]
    })
    mockEdgeDetector.calculateClamp.mockReturnValue(1)
    mockTargetDetector.distanceToTarget.mockReturnValue(0)

    expect(() => {
      const particle = new Particle(
        position,
        velocity,
        mockTargetDetector,
        mockEdgeDetector
      )
      particle.move([])
    }).toThrow()
  })
})
