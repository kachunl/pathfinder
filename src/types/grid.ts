export const NodeType = { Empty: 0, Wall: 1, Weight: 2, Start: 3, End: 4 } as const
export type NodeType = (typeof NodeType)[keyof typeof NodeType]

export interface GridPosition {
  row: number
  col: number
}

export interface GridNode extends GridPosition {
  type: NodeType
  visited: boolean
  inOpen: boolean
  pathOrder: number
}

export type Grid = GridNode[][]

export type AlgorithmType = 'astar' | 'dijkstra' | 'bfs'
export type HeuristicType = 'manhattan' | 'euclidean' | 'aggressive'
export type DrawMode = 'wall' | 'weight' | 'start' | 'end'

export interface AlgorithmStep {
  current: GridNode
  opened: GridNode[]
}

export interface AlgorithmResult {
  steps: AlgorithmStep[]
  path: GridNode[]
}

export interface VisualiserStats {
  visited: number
  pathLength: number
  pathCost: number
  timeMs: number
}
