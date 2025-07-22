import { useContext } from 'react'
import type { ICoordinate } from '../../types/coordinate'
import type { IField } from '../../types/field'
import { PSOContext } from '../contexts/pso-context'

export default function Field({ bounds }: IField) {
  const svgConverter = useContext(PSOContext)
  const points = bounds
    .map((point: ICoordinate) => svgConverter.toWebArray(point))
    .reduce((acc: string, point: ICoordinate) => {
      return `${acc} ${point.join()}`
    }, '')
    .trim()

  return (
    <polygon
      className="field"
      points={points}
      fill="transparent"
      stroke="black"
      strokeWidth="1"
    />
  )
}
