// export type DimensionalArray<T> = Array<T> & { 0: T } & Array<T>;
export type DimensionalArray<T> = [T, ...T[]]
