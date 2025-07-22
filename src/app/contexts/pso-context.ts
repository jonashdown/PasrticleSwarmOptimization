import { createContext } from 'react'
import type { CoordinateConverter } from '../../classes/coordinate-converter'

export const PSOContext = createContext<CoordinateConverter>(
  null as unknown as CoordinateConverter
)
