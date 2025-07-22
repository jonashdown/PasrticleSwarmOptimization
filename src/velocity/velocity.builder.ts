import { AbstractBuilder } from '../lib/abstract-builder'
import type { IVelocity } from './velocity.types'

export class VelocityBuilder extends AbstractBuilder<IVelocity> {
  protected build(): IVelocity {
    // Implementation of the builder
    return {} as IVelocity
  }
}
