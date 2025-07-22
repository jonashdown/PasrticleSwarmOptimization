import { useContext } from 'react'
import type { IParticle } from '../../types/particle'
import { PSOContext } from '../contexts/pso-context'

import type { ICoordinate } from '../../coordinate/coordinate.types'

export interface TwoDimensionalParticleProps {
  particle: IParticle
  radius: number
  targetCoordinates: ICoordinate
}

function getDistance(p1: ICoordinate, p2: ICoordinate): number {
  const dx = p1[0] - p2[0]
  const dy = p1[1] - p2[1]
  return Math.sqrt(dx * dx + dy * dy)
}

function getColor(distance: number, maxDistance: number): string {
  const normalizedDistance = Math.min(1, distance / maxDistance)
  const hue = (1 - normalizedDistance) * 240 // From blue (240) to red (0)
  return `hsl(${hue}, 100%, 50%)`
}

export default function TwoDimensionalParticle({
  particle,
  radius,
  targetCoordinates
}: TwoDimensionalParticleProps) {
  const svgConverter = useContext(PSOContext)
  const { position, id } = particle

  const { x, y } = svgConverter.toWebObject(position)

  const distance = getDistance(position, targetCoordinates)
  // Assuming a max distance for color scaling, adjust as needed for your field size
  const maxDistance = 100 // This should ideally come from field bounds or be dynamic
  const color = getColor(distance, maxDistance)

  return (
    <circle
      className="particle"
      cx={x}
      cy={y}
      r={radius}
      key={id}
      fill={color}
    />
  )
}
