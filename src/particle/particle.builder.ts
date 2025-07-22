import { AbstractBuilder } from '../lib/abstract-builder'
import type { IParticle } from './particle.types'

export class ParticleBuilder extends AbstractBuilder<IParticle> {
  protected build(): IParticle {
    // Implementation of the builder
    return {} as IParticle
  }
}
