import type { AlgorithmResult, AlgorithmStep, Grid, GridNode, GridPosition } from '../types/grid.ts'
import { getNeighbors, getNode, tracePath } from '../utils/grid.ts'

// unweighted: shortest by step count, ignores weight cells' cost
export function bfs(grid: Grid, start: GridPosition, end: GridPosition): AlgorithmResult {
  const startNode = getNode(grid, start.row, start.col)
  const endNode = getNode(grid, end.row, end.col)
  const prev = new Map<GridNode, GridNode>()
  const seen = new Set([startNode])
  const queue = [startNode]
  const steps: AlgorithmStep[] = []

  for (let i = 0; i < queue.length; i++) {
    const node = queue[i]!
    const opened: GridNode[] = []
    steps.push({ current: node, opened })
    if (node === endNode) return { steps, path: tracePath(prev, endNode) }

    for (const next of getNeighbors(grid, node)) {
      if (seen.has(next)) continue
      seen.add(next)
      prev.set(next, node)
      queue.push(next)
      opened.push(next)
    }
  }
  return { steps, path: [] }
}
