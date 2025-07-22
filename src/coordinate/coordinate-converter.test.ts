import { describe, expect, it } from 'bun:test'
import { CoordinateConverter } from './coordinate-converter'

describe('CoordinateConverter', () => {
  const converter = new CoordinateConverter(100, 100)

  describe('constructor', () => {
    it('should initialize with given width and height', () => {
      expect(converter.origin.x).toBe(50)
      expect(converter.origin.y).toBe(50)
    })

    it('should throw RangeError if width is zero', () => {
      expect(() => new CoordinateConverter(0, 100)).toThrow(RangeError)
      expect(() => new CoordinateConverter(0, 100)).toThrow(
        'width should be non-zero'
      )
    })

    it('should throw RangeError if height is zero', () => {
      expect(() => new CoordinateConverter(100, 0)).toThrow(RangeError)
      expect(() => new CoordinateConverter(100, 0)).toThrow(
        'height should be non-zero'
      )
    })
  })

  describe('toWebObject()', () => {
    it('should convert coordinates correctly', () => {
      const webCoord = converter.toWebObject([10, 20])
      expect(webCoord.x).toBe(60)
      expect(webCoord.y).toBe(30)
    })

    it('should convert coordinates correctly', () => {
      const webCoord = converter.toWebObject([-10, -20])
      expect(webCoord.x).toBe(40)
      expect(webCoord.y).toBe(70)
    })

    it('should convert origin coordinates correctly', () => {
      const webCoord = converter.toWebObject([0, 0])
      expect(webCoord.x).toBe(50)
      expect(webCoord.y).toBe(50)
    })

    it('should convert edge coordinates correctly', () => {
      const webCoord = converter.toWebObject([50, 50])
      expect(webCoord.x).toBe(100)
      expect(webCoord.y).toBe(0)
    })

    it('should convert negative edge coordinates correctly', () => {
      const webCoord = converter.toWebObject([-50, -50])
      expect(webCoord.x).toBe(0)
      expect(webCoord.y).toBe(100)
    })
  })

  describe('toWebArray()', () => {
    it('should convert coordinates correctly', () => {
      const webCoord = converter.toWebArray([10, 20])
      expect(webCoord[0]).toBe(60)
      expect(webCoord[1]).toBe(30)
    })

    it('should convert negative coordinates correctly', () => {
      const webCoord = converter.toWebArray([-10, -20])
      expect(webCoord[0]).toBe(40)
      expect(webCoord[1]).toBe(70)
    })

    it('should convert origin coordinates correctly', () => {
      const webCoord = converter.toWebArray([0, 0])
      expect(webCoord[0]).toBe(50)
      expect(webCoord[1]).toBe(50)
    })

    it('should convert edge coordinates correctly', () => {
      const webCoord = converter.toWebArray([50, 50])
      expect(webCoord[0]).toBe(100)
      expect(webCoord[1]).toBe(0)
    })

    it('should convert negative edge coordinates correctly', () => {
      const webCoord = converter.toWebArray([-50, -50])
      expect(webCoord[0]).toBe(0)
      expect(webCoord[1]).toBe(100)
    })
  })

  describe('toCartesian()', () => {
    it('should convert bottom right coordinates correctly', () => {
      const cartesian = converter.toCartesian({ x: 100, y: 100 })
      expect(cartesian[0]).toBe(50)
      expect(cartesian[1]).toBe(-50)
    })

    it('should convert top left coordinates correctly', () => {
      const cartesian = converter.toCartesian({ x: 0, y: 0 })
      expect(cartesian[0]).toBe(-50)
      expect(cartesian[1]).toBe(50)
    })

    it('should convert origin coordinates correctly', () => {
      const cartesian = converter.toCartesian({ x: 50, y: 50 })
      expect(cartesian[0]).toBe(0)
      expect(cartesian[1]).toBe(0)
    })
  })
})
