import { expect, test } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { CoordinateConverter } from '../../coordinate/coordinate-converter'
import type { IParticle } from '../../particle/particle.types'
import { PSOContext } from '../contexts/pso-context'
import TwoDimensionalParticle from './particle'

test('TwoDimensionalParticle component', () => {
  const particle: IParticle = {
    id: 'particle-1',
    position: [10, 20],
    velocity: [0, 0],
    bestPosition: [10, 20],
    cost: 0,
    bestCost: 0
  }
  const svgConverter = new CoordinateConverter(100, 100)

  const { container } = render(
    <PSOContext.Provider value={svgConverter}>
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: rendered in RTL */}
      <svg>
        <TwoDimensionalParticle
          particle={particle}
          radius={5}
          targetCoordinates={[0, 0]}
        />
      </svg>
    </PSOContext.Provider>
  )

  const circle = container.querySelector('.particle')
  expect(circle).toBeInTheDocument()
  expect(circle?.getAttribute('cx')).toBe('60')
  expect(circle?.getAttribute('cy')).toBe('30')
  expect(circle?.getAttribute('r')).toBe('5')
})
