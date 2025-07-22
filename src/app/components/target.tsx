import { useContext } from 'react'
import type { ICoordinate } from '../../types/coordinate'
import { PSOContext } from '../contexts/pso-context'

export type TwoDimensionalTargetProps = {
  coordinates: ICoordinate
  radius: number
}
export default function TwoDimensionalTarget({
  coordinates,
  radius
}: TwoDimensionalTargetProps) {
  const svgConverter = useContext(PSOContext)
  const { x, y } = svgConverter.toWebObject(coordinates)

  return (
    <>
      <circle
        className="target-outer"
        cx={x}
        cy={y}
        r={radius}
        stroke="black"
        strokeWidth="1"
        fill="none"
      />
      <circle
        className="target-middle"
        cx={x}
        cy={y}
        r={radius * 0.66}
        stroke="gray"
        strokeWidth="1"
        fill="none"
      />
      <circle
        className="target-inner"
        cx={x}
        cy={y}
        r={radius * 0.33}
        stroke="red"
        strokeWidth="1"
        fill="none"
      />
    </>
  )
}
