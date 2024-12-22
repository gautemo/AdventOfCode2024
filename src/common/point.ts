export type Point = { x: number; y: number }

export function isNeighbour(a: Point, b: Point) {
  return distanceBetween(a, b) === 1
}

export function distanceBetween(a: Point, b: Point) {
  const diffX = Math.abs(a.x - b.x)
  const diffY = Math.abs(a.y - b.y)
  return diffX + diffY
}
