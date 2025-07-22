import { AbstractBuilder } from '../lib/abstract-builder'
import type { ISwarm } from './swarm.types'

export class SwarmBuilder extends AbstractBuilder<ISwarm> {
  protected build(): ISwarm {
    // Implementation of the builder
    return {} as ISwarm
  }
}
