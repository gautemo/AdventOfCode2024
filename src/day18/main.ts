import { Point } from '../common/point.ts'

// TODO - refactor for speed? Only do A* if new byte is in last path

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day18.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}

export function part1(input: string, range = 70, bytes = 1024) {
  const closedPoints = input.split('\n').slice(0, bytes).map((b) => {
    const [x, y] = b.split(',').map(Number)
    return { x, y }
  })
  return aStar({ x: 0, y: 0 }, { x: range, y: range }, range + 1, range + 1, closedPoints)
}

function heuristic(a: Point, b: Point) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

function reconstructPath(cameFrom: Map<string, string>, end: string) {
  let totalPath = 0
  let current = end
  while (cameFrom.has(current)) {
    totalPath++
    current = cameFrom.get(current)!
  }
  return totalPath
}

function aStar(start: Point, goal: Point, width: number, height: number, closed: Point[]) {
  const openSet = [start]
  const cameFrom = new Map<string, string>()
  const gScore = new Map<string, number>()
  gScore.set(key(start), 0)
  const fScore = new Map<string, number>()
  gScore.set(key(start), heuristic(start, goal))
  while (openSet.length > 0) {
    const current = openSet.sort((a, b) => fScore.get(key(b))! - fScore.get(key(a))!).pop()!
    if (key(current) === key(goal)) {
      return reconstructPath(cameFrom, key(current))
    }
    for (const neighbour of openNeighbours(current, width, height, closed)) {
      const tentativeGScore = gScore.get(key(current))! + 1
      if (tentativeGScore < (gScore.get(key(neighbour)) ?? Infinity)) {
        cameFrom.set(key(neighbour), key(current))
        gScore.set(key(neighbour), tentativeGScore)
        fScore.set(key(neighbour), tentativeGScore + heuristic(neighbour, goal))
        if (!openSet.some((o) => key(o) === key(neighbour))) openSet.push(neighbour)
      }
    }
  }
  return null
}

function openNeighbours(on: Point, width: number, height: number, closed: Point[]): Point[] {
  return [
    { x: on.x - 1, y: on.y },
    { x: on.x + 1, y: on.y },
    { x: on.x, y: on.y - 1 },
    { x: on.x, y: on.y + 1 },
  ]
    .filter((p) => p.x >= 0 && p.x < width)
    .filter((p) => p.y >= 0 && p.y < height)
    .filter((p) => !closed.some((c) => key(p) === key(c)))
}

export function part2(input: string, range = 70) {
  const closedPoints = input.split('\n').map((b) => {
    const [x, y] = b.split(',').map(Number)
    return { x, y }
  })
  for (let i = 0; i < closedPoints.length; i++) {
    const steps = aStar({ x: 0, y: 0 }, { x: range, y: range }, range + 1, range + 1, closedPoints.slice(0, i + 1))
    if (steps === null) {
      return key(closedPoints[i])
    }
  }
  throw new Error('should be closed by now')
}

function key(point: Point) {
  return `${point.x},${point.y}`
}
