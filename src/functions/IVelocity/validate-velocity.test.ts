//@ts-nocheck
import { describe, expect, it } from 'bun:test'
import { validateVelocity } from './validate-velocity'

describe(' validateVelocity ()', () => {
  it.each([
    ['valid numerical array', [1, 2, 3]],
    ['single value numerical array', [42]],
    ['array with negative and positive numbers', [-5, 0, 7, -2]],
    ['array with floating point numbers', [1.1, 2.5, -3.7]]
  ])('should return input for %s', (_t, input) => {
    const result = validateVelocity(input)
    expect(result).toEqual(input)
  })

  it.each([
    ['empty array', []],
    ['explicit undefined', undefined],
    ['null', null],
    ['a string', 'some string'],
    ['a number', 1234],
    ['an object', { a: 1 }],
    ['a boolean', true],
    ['an array that has a string', [1, 'a', 3]],
    ['an array that has a boolean', [true, 2, 3]],
    ['an array that has an undefined', [undefined, 2, 3]],
    ['an array that has a null', [null, 2, 3]],
    ['an array that has an object', [null, 2, { a: 3 }]]
  ])('should throw Type Error for %s', (_t, input) => {
    expect(() => validateVelocity(input)).toThrowError(TypeError)
    expect(() => validateVelocity(input)).toThrow(
      'velocity must be a numerical array'
    )
  })
})
