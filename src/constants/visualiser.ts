import type { AlgorithmType, DrawMode, GridPosition, HeuristicType } from '../types/grid.ts'

// odd dimensions so the maze gets single-thick outer walls
export const ROWS = 25
export const COLS = 49
export const WEIGHT_COST = 5

// odd coordinates sit on maze passages, so a maze never moves them
export const DEFAULT_START: GridPosition = { row: 11, col: 7 }
export const DEFAULT_END: GridPosition = { row: 11, col: 41 }

export const SPEED_DELAYS = { slow: 80, medium: 25, fast: 5 } as const
export type Speed = keyof typeof SPEED_DELAYS

export const SPEED_LABELS: Record<Speed, string> = { slow: 'Slow', medium: 'Medium', fast: 'Fast' }

export const ALGORITHM_LABELS: Record<AlgorithmType, string> = {
  astar: 'A*',
  dijkstra: 'Dijkstra',
  bfs: 'BFS',
}

export const ALGORITHM_NOTES: Record<AlgorithmType, string> = {
  astar: 'Expands the cell with the lowest cost so far plus estimated distance left.',
  dijkstra: 'Expands the cheapest cell first. Always finds the cheapest route.',
  bfs: 'Expands in rings by step count. Treats slow ground like open ground.',
}

export const HEURISTIC_LABELS: Record<HeuristicType, string> = {
  manhattan: 'Manhattan',
  euclidean: 'Euclidean',
  aggressive: 'Aggressive ×3 (may miss the best route)',
}

export const MODE_LABELS: Record<DrawMode, string> = {
  wall: 'Wall',
  weight: 'Slow ground',
  start: 'Start',
  end: 'Finish',
}
