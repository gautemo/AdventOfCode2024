import { isNeighbour } from '../common/point.ts'
import { Point } from '../common/point.ts'

type Node = Point & { dir: '^' | 'v' | '<' | '>' }

const cachedDijkstra = new Map<string, { dist: Map<string, number>; prev: Map<string, Node[]> }>()

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day16.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}

export function part1(input: string) {
  const { start, goal, tiles } = getMap(input)
  const { dist, prev } = dijkstra(tiles, start)
  cachedDijkstra.set(input, { dist, prev })
  return goal.map((g) => dist.get(key(g))).sort()[0]
}

export function part2(input: string) {
  const { start, goal, tiles } = getMap(input)
  const { dist, prev } = cachedDijkstra.has(input) ? cachedDijkstra.get(input)! : dijkstra(tiles, start)
  const best = goal.sort((a, b) => (dist.get(key(a)) ?? Infinity) - (dist.get(key(b)) ?? Infinity))[0]
  const tilesPartOfBest = [best]
  const nodeQueue = [best]
  const checked = [key(best)]
  while (nodeQueue.length > 0) {
    const current = nodeQueue.shift()!
    const prevs = prev.get(key(current))
    if (prevs) {
      for (const p of prevs) {
        if (!checked.includes(key(p))) {
          checked.push(key(p))
          nodeQueue.push(p)
          if (!tilesPartOfBest.some((t) => t.x === p.x && t.y === p.y)) {
            tilesPartOfBest.push(p)
          }
        }
      }
    }
  }
  return tilesPartOfBest.length
}

function getMap(input: string) {
  let start: Node | null = null
  const goal: Node[] = []
  const tiles: Node[] = []
  const lines = input.split('\n')
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    for (let x = 0; x < line.length; x++) {
      const canPointHorizontal = line[x - 1] === '.' || line[x + 1] === '.'
      const canPointVertical = lines[y - 1]?.[x] === '.' || lines[y + 1]?.[x] === '.'
      if (line[x] === 'S') {
        start = { x, y, dir: '>' }
        tiles.push(start)
      } else if (line[x] === 'E') {
        if (canPointHorizontal) {
          goal.push({ x, y, dir: '>' })
          goal.push({ x, y, dir: '<' })
        }
        if (canPointVertical) {
          goal.push({ x, y, dir: '^' })
          goal.push({ x, y, dir: 'v' })
        }
      } else if (line[x] === '.') {
        if (canPointHorizontal) {
          tiles.push({ x, y, dir: '>' })
          tiles.push({ x, y, dir: '<' })
        }
        if (canPointVertical) {
          tiles.push({ x, y, dir: '^' })
          tiles.push({ x, y, dir: 'v' })
        }
      }
    }
  }
  return { start: start!, goal, tiles: [...tiles, ...goal] }
}

/*
Modification: prev is array of node to support multiple best paths
*/
export function dijkstra(graphNodes: Node[], start: Node) {
  const queue: Node[] = []
  const dist = new Map<string, number>()
  const prev = new Map<string, Node[]>()
  graphNodes.forEach((node) => {
    dist.set(key(node), Infinity)
    queue.push(node)
  })
  dist.set(key(start), 0)

  while (queue.length > 0) {
    const u = queue.sort((a, b) => dist.get(key(a))! - dist.get(key(b))!).shift()!

    const neighboursInQueue = queue.filter((p) => canGo(u, p))
    neighboursInQueue.forEach((v) => {
      const alt = dist.get(key(u))! + (u.dir === v.dir ? 1 : 1001)
      if (alt <= dist.get(key(v))!) {
        dist.set(key(v), alt)
        if (prev.has(key(v))) {
          prev.get(key(v))?.push(u)
        } else {
          prev.set(key(v), [u])
        }
      }
    })
  }
  return { dist, prev }
}

function key(node: Node) {
  return `${node.x},${node.y}:${node.dir}`
}

function canGo(from: Node, to: Node) {
  if (!isNeighbour(from, to)) return false
  if (from.dir === '<') {
    return to.dir === '<' || (['^', 'v'].includes(to.dir) && from.x === to.x)
  }
  if (from.dir === '>') {
    return to.dir === '>' || (['^', 'v'].includes(to.dir) && from.x === to.x)
  }
  if (from.dir === '^') {
    return to.dir === '^' || (['<', '>'].includes(to.dir) && from.y === to.y)
  }
  return to.dir === 'v' || (['<', '>'].includes(to.dir) && from.y === to.y)
}
