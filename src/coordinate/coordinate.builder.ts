import { AbstractBuilder } from '../lib/abstract-builder'
import type { ICoordinate } from './coordinate.types'

export class CoordinateBuilder extends AbstractBuilder<ICoordinate> {
  protected build(): ICoordinate {
    // Implementation of the builder
    return {} as ICoordinate
  }
}
