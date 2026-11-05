import type { AlgorithmResult, AlgorithmStep, Grid, GridNode, GridPosition } from '../types/grid.ts'
import { getNeighbors, getNode, getNodeCost, tracePath } from '../utils/grid.ts'
import { MinHeap } from '../utils/MinHeap.ts'
import type { Heuristic } from './heuristics.ts'

interface OpenEntry {
  node: GridNode
  g: number
  h: number
  f: number
}

export function astar(grid: Grid, start: GridPosition, end: GridPosition, h: Heuristic): AlgorithmResult {
  const startNode = getNode(grid, start.row, start.col)
  const endNode = getNode(grid, end.row, end.col)
  const g = new Map<GridNode, number>([[startNode, 0]])
  const prev = new Map<GridNode, GridNode>()
  const closed = new Set<GridNode>()
  const open = new MinHeap<OpenEntry>((a, b) => a.f - b.f || a.h - b.h)
  const steps: AlgorithmStep[] = []

  const h0 = h(startNode, endNode)
  open.push({ node: startNode, g: 0, h: h0, f: h0 })

  for (let entry = open.pop(); entry; entry = open.pop()) {
    const { node } = entry
    if (closed.has(node)) continue
    closed.add(node)
    const opened: GridNode[] = []
    steps.push({ current: node, opened })
    if (node === endNode) return { steps, path: tracePath(prev, endNode) }

    for (const next of getNeighbors(grid, node)) {
      if (closed.has(next)) continue
      const nextG = entry.g + getNodeCost(next)
      if (nextG >= (g.get(next) ?? Infinity)) continue
      g.set(next, nextG)
      prev.set(next, node)
      const nextH = h(next, endNode)
      open.push({ node: next, g: nextG, h: nextH, f: nextG + nextH })
      opened.push(next)
    }
  }
  return { steps, path: [] }
}
