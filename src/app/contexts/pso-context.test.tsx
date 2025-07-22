import { expect, test } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { useContext } from 'react'
import { CoordinateConverter } from '../../coordinate/coordinate-converter'
import { PSOContext } from './pso-context'

function TestComponent() {
  const coordinateConverter = useContext(PSOContext)
  return (
    <div data-testid="converter-instance">
      {coordinateConverter instanceof CoordinateConverter ? 'true' : 'false'}
    </div>
  )
}

test('SVGContext provides SVGCoordinateConverter instance', () => {
  const coordinateConverter = new CoordinateConverter(100, 100)

  render(
    <PSOContext.Provider value={coordinateConverter}>
      <TestComponent />
    </PSOContext.Provider>
  )

  const converterInstance = screen.getByTestId('converter-instance')
  expect(converterInstance.textContent).toBe('true')
})
