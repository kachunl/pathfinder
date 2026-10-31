import { NodeType, type Grid, type GridNode, type GridPosition } from '../types/grid.ts'
import { WEIGHT_COST } from '../constants/visualiser.ts'

const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
] as const

export const createNode = (row: number, col: number): GridNode => ({
  row,
  col,
  type: NodeType.Empty,
  visited: false,
  inOpen: false,
  pathOrder: -1,
})

export const createGrid = (rows: number, cols: number): Grid =>
  Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => createNode(r, c)))

export const isInBounds = (grid: Grid, row: number, col: number): boolean =>
  row >= 0 && row < grid.length && col >= 0 && col < (grid[0]?.length ?? 0)

export function getNode(grid: Grid, row: number, col: number): GridNode {
  const node = grid[row]?.[col]
  if (!node) throw new RangeError(`No node at (${row}, ${col})`)
  return node
}

export function resetAlgoState(grid: Grid): void {
  for (const row of grid)
    for (const node of row) {
      node.visited = false
      node.inOpen = false
      node.pathOrder = -1
    }
}

// removes walls and weights, keeps start and end
export function clearBoard(grid: Grid): void {
  for (const row of grid)
    for (const node of row) if (node.type === NodeType.Wall || node.type === NodeType.Weight) node.type = NodeType.Empty
}

export function getNeighbors(grid: Grid, { row, col }: GridPosition): GridNode[] {
  const neighbors: GridNode[] = []
  for (const [dr, dc] of DIRECTIONS) {
    const node = grid[row + dr]?.[col + dc]
    if (node && node.type !== NodeType.Wall) neighbors.push(node)
  }
  return neighbors
}

export const getNodeCost = (node: GridNode): number => (node.type === NodeType.Weight ? WEIGHT_COST : 1)

export function tracePath(prev: Map<GridNode, GridNode>, end: GridNode): GridNode[] {
  const path = [end]
  for (let cur = prev.get(end); cur; cur = prev.get(cur)) path.push(cur)
  return path.reverse()
}
