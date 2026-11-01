import type { GridPosition, HeuristicType } from '../types/grid.ts'

export type Heuristic = (a: GridPosition, b: GridPosition) => number

const manhattan: Heuristic = (a, b) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col)

export const heuristics: Record<HeuristicType, Heuristic> = {
  manhattan,
  euclidean: (a, b) => Math.hypot(a.row - b.row, a.col - b.col),
  aggressive: (a, b) => 3 * manhattan(a, b),
}
