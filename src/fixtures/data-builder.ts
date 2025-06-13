export abstract class DataBuilder<T> {
  data!: Partial<T>

  with<K extends keyof T>(k: K, v: T[K] | undefined) {
    this.data[k] = v
    return this
  }
}
