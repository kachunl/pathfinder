import type { AlgorithmResult, AlgorithmType, Grid, GridPosition, HeuristicType } from '../types/grid.ts'
import { astar } from './astar.ts'
import { bfs } from './bfs.ts'
import { heuristics } from './heuristics.ts'

export function runAlgorithm(
  algorithm: AlgorithmType,
  grid: Grid,
  start: GridPosition,
  end: GridPosition,
  heuristic: HeuristicType,
): AlgorithmResult {
  switch (algorithm) {
    case 'astar':
      return astar(grid, start, end, heuristics[heuristic])
    case 'dijkstra':
      return astar(grid, start, end, () => 0)
    case 'bfs':
      return bfs(grid, start, end)
  }
}
