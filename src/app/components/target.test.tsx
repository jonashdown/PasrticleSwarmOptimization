import { expect, test } from 'bun:test'
import { render } from '@testing-library/react'
import { CoordinateConverter } from '../../coordinate/coordinate-converter'
import type { ICoordinate } from '../../coordinate/coordinate.types'
import { PSOContext } from '../contexts/pso-context'
import TwoDimensionalTarget from './target'

test('TwoDimensionalTarget component', () => {
  const coordinates = [30, 40] as ICoordinate
  const svgConverter = new CoordinateConverter(100, 100)

  const { container } = render(
    <PSOContext.Provider value={svgConverter}>
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: Headless rendering */}
      <svg>
        <TwoDimensionalTarget coordinates={coordinates} radius={10} />
      </svg>
    </PSOContext.Provider>
  )

  const outerCircle = container.querySelector('.target-outer')
  const middleCircle = container.querySelector('.target-middle')
  const innerCircle = container.querySelector('.target-inner')

  expect(outerCircle).not.toBeNull()
  expect(outerCircle?.getAttribute('cx')).toBe('80')
  expect(outerCircle?.getAttribute('cy')).toBe('10')
  expect(outerCircle?.getAttribute('r')).toBe('10')

  expect(middleCircle).not.toBeNull()
  expect(middleCircle?.getAttribute('cx')).toBe('80')
  expect(middleCircle?.getAttribute('cy')).toBe('10')
  expect(Number.parseFloat(middleCircle?.getAttribute('r') || '0')).toBeCloseTo(
    6.6
  )

  expect(innerCircle).not.toBeNull()
  expect(innerCircle?.getAttribute('cx')).toBe('80')
  expect(innerCircle?.getAttribute('cy')).toBe('10')
  expect(Number.parseFloat(innerCircle?.getAttribute('r') || '0')).toBeCloseTo(
    3.3
  )
})
