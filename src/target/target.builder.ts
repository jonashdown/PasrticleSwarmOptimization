import { AbstractBuilder } from '../lib/abstract-builder'
import type { ITarget } from './target.types'

export class TargetBuilder extends AbstractBuilder<ITarget> {
  protected build(): ITarget {
    // Implementation of the builder
    return {} as ITarget
  }
}
