import { sumOf } from '@std/collections'
import { distanceBetween, isNeighbour, Point } from '../common/point.ts'

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day20.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}

export function part1(input: string, timeSavedLimit = 100) {
  return cheats(input, 2, timeSavedLimit)
}

export function part2(input: string, timeSavedLimit = 100) {
  return cheats(input, 20, timeSavedLimit)
}

function cheats(input: string, picosecondsToCheat: number, timeSavedLimit: number) {
  const { track, start, goal } = getTrack(input)
  const fromStart = dijkstra(track, start)
  const fromGoal = dijkstra(track, goal)
  const fastestNoCheat = fromStart.dist.get(key(goal))!
  return sumOf([...fromStart.dist], (d) => {
    const point = keyToPoint(d[0])
    return track.filter((t) => {
      const time = d[1] + fromGoal.dist.get(key(t))! + distanceBetween(point, t)
      return cheatPossible(point, t, picosecondsToCheat) && time <= fastestNoCheat - timeSavedLimit
    }).length
  })
}

function getTrack(input: string) {
  const track: Point[] = []
  let start: Point
  let goal: Point
  const lines = input.split('\n')
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    for (let x = 0; x < line.length; x++) {
      const point = { x, y }
      if (['.', 'S', 'E'].includes(line[x])) {
        track.push(point)
      }
      if (line[x] === 'S') start = point
      if (line[x] === 'E') goal = point
    }
  }
  return { track, start: start!, goal: goal! }
}

function cheatPossible(a: Point, b: Point, picoseconds: number) {
  const dist = distanceBetween(a, b)
  return dist > 1 && dist <= picoseconds
}

export function dijkstra(graphNodes: Point[], source: Point) {
  const queue: Point[] = []
  const dist = new Map<string, number>()
  const prev = new Map<string, Point>()
  graphNodes.forEach((node) => {
    dist.set(key(node), Infinity)
    queue.push(node)
  })
  dist.set(key(source), 0)

  while (queue.length > 0) {
    const u = queue.sort((a, b) => dist.get(key(a))! - dist.get(key(b))!).shift()!

    const neighboursInQueue = queue.filter((p) => isNeighbour(u, p))
    neighboursInQueue.forEach((v) => {
      const alt = dist.get(key(u))! + 1
      if (alt < dist.get(key(v))!) {
        dist.set(key(v), alt)
        prev.set(key(v), u)
      }
    })
  }
  return { dist, prev }
}

function key(point: Point) {
  return `${point.x},${point.y}`
}

function keyToPoint(key: string): Point {
  const [x, y] = key.split(',').map(Number)
  return { x, y }
}
