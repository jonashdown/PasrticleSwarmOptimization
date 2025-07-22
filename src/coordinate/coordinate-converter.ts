import type { ICoordinate } from '../types/coordinate'

export interface WebCoordinate {
  x: number
  y: number
}

export class CoordinateConverter {
  private width: number
  private height: number
  origin: WebCoordinate

  constructor(width: number, height: number) {
    if (!width) {
      throw new RangeError('width should be non-zero')
    }
    if (!height) {
      throw new RangeError('height should be non-zero')
    }

    this.width = width
    this.height = height

    this.origin = { x: width / 2, y: height / 2 }
  }

  private xToWeb(x: number) {
    return this.origin.x + x
  }

  private yToWeb(y: number) {
    return this.origin.y - y
  }

  toWebObject(coordinate: ICoordinate): WebCoordinate {
    const [x, y] = coordinate

    return { x: this.xToWeb(x), y: this.yToWeb(y) }
  }

  toWebArray(coordinate: ICoordinate): ICoordinate {
    const [x, y] = coordinate

    return [this.xToWeb(x), this.yToWeb(y)]
  }

  toCartesian(coordinate: WebCoordinate): ICoordinate {
    const { x, y } = coordinate

    return [x - this.origin.x, this.origin.y - y]
  }
}
