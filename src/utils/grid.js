export const NODE = { EMPTY: 0, WALL: 1, WEIGHT: 2, START: 3, END: 4 }

export function createGrid(rows, cols) {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => createNode(r, c))
  )
}

export function createNode(row, col) {
  return {
    row, col,
    type: NODE.EMPTY,
    g: Infinity,
    f: Infinity,
    h: 0,
    prev: null,
    visited: false,
    inOpen: false,
    isPath: false,
  }
}

export function resetAlgo(grid) {
  return grid.map(row => row.map(node => ({
    ...node,
    g: Infinity, f: Infinity, h: 0,
    prev: null, visited: false, inOpen: false, isPath: false,
  })))
}

export function getNeighbors(grid, row, col, allowDiagonal = false) {
  const dirs = [[-1,0],[1,0],[0,-1],[0,1]]
  if (allowDiagonal) dirs.push([-1,-1],[-1,1],[1,-1],[1,1])
  const neighbors = []

  for (const [dr, dc] of dirs) {
    const r = row + dr, c = col + dc
    if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length)
      if (grid[r][c].type !== NODE.WALL)
        neighbors.push(grid[r][c])
  }

  return neighbors
}

export function tracePath(grid, endNode) {
  const path = []
  let cur = endNode

  while (cur) {
    path.unshift(cur)
    const p = cur.prev
    cur = p ? grid[p.row][p.col] : null
  }
  
  return path
}