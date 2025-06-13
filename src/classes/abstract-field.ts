import type { ICoordinate } from '../types/coordinate'

export abstract class AField {
  coordinates!: Array<ICoordinate>

  constructor(coordinates: Array<ICoordinate>) {
    //nned to check alll coordinates are the same length
    //need to check overall size is length of first cooordinate + 1
  }

  abstract inField(coordinate: ICoordinate): boolean
}
