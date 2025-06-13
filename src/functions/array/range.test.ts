import { describe, expect, it } from 'bun:test'
import { range } from './range'

describe('range()', () => {
  it('returns an array with the supplied size', () => {
    const result = range(2)
    expect(result).toHaveLength(2)
  })

  it('returns an array of integers in sequence', () => {
    const result = range(10)
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('throws if the size is 0', () => {
    expect(() => range(0)).toThrowError('Range must be greater than zero')
  })

  it.each(['a', Math.PI])(
    'throws if the size is not an integer - %o',
    (badInput) => {
      expect(() => range(badInput as number)).toThrowError(
        'Range must be a positive integer'
      )
    }
  )
})
