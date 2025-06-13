import { validateCoordinate } from '../functions/ICoordinate/validate-coordinate'
import type { ICoordinate } from '../types/coordinate'

export abstract class ATargetDetector {
  public target!: ICoordinate

  abstract distanceToTarget(coordinate: ICoordinate): number
  abstract isAtTarget(coordinate: ICoordinate): boolean

  setTarget (coordinate: ICoordinate) {
    this.target = validateCoordinate(coordinate)
  }
}
