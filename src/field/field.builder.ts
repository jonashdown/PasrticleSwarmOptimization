import { AbstractBuilder } from '../lib/abstract-builder'
import type { IField } from './field.types'

export class FieldBuilder extends AbstractBuilder<IField> {
  protected build(): IField {
    // Implementation of the builder
    return {} as IField
  }
}
