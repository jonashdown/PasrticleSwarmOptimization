import { expect, test } from 'bun:test'
import { render } from '@testing-library/react'
import { CoordinateConverter } from '../../coordinate/coordinate-converter'
import type { ICoordinate } from '../../coordinate/coordinate.types'
import { PSOContext } from '../contexts/pso-context'
import Field from './field'

test('Field component', () => {
  const bounds = [
    [0, 0],
    [10, 0],
    [10, 10],
    [0, 10]
  ] as ICoordinate[]
  const svgConverter = new CoordinateConverter(100, 100)

  const { container } = render(
    <PSOContext.Provider value={svgConverter}>
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg>
        <Field bounds={bounds} />
      </svg>
    </PSOContext.Provider>
  )

  const polygon = container.querySelector('.field')
  expect(polygon).toBeInTheDocument()
  expect(polygon?.getAttribute('points')).toBe('50,50 60,50 60,40 50,40')
})
