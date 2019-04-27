import { Limit } from './limit'
import { Vector1D } from './vector1d'

type Params = {
  limit: Limit
  location: Vector1D
  span: number
  vectors: Vector1D[]
}

export type VectorLooper = {
  loop: (direction: number) => VectorLooper
}

export function VectorLooper(params: Params): VectorLooper {
  const { limit, location, span, vectors } = params

  function shouldLoop(direction: number): boolean {
    const { reachedLow, reachedHigh } = limit
    const reachedLimit = direction === -1 ? reachedLow : reachedHigh
    return direction !== 0 && reachedLimit(location.get())
  }

  function loop(direction: number): VectorLooper {
    if (shouldLoop(direction)) {
      const distance = span * (direction * -1)
      vectors.forEach(v => v.addNumber(distance))
    }
    return self
  }

  const self: VectorLooper = {
    loop,
  }
  return Object.freeze(self)
}
