import { Point } from '../common/point.ts'

// TODO - refactor

type Reindeer = Point & { direction: '^' | '>' | 'v' | '<' }
type Maze = { map: string[]; start: Reindeer; goal: Point }

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day16.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}

export function part1(input: string) {
  const { map, start } = getMap(input)
  const visited = new Map<string, number>()
  visited.set(stateAsKey(start), 0)
  const toCheck = [{ on: start, score: 0 }]
  let best = Infinity
  while (true) {
    if (toCheck.length === 0) break
    const next = toCheck.sort((a, b) => b.score - a.score).pop()!
    if (next.score > best) {
      continue
    }
    visited.set(stateAsKey(next.on), next.score)
    const actions = nextOptions(next.on)
    for (const action of actions) {
      const newScore = next.score + action.addedScore
      if (map[action.reindeer.y][action.reindeer.x] === '#') {
        continue
      }
      if (visited.has(stateAsKey(action.reindeer)) && visited.get(stateAsKey(action.reindeer))! < newScore) {
        continue
      }
      if (toCheck.some((check) => stateAsKey(check.on) === stateAsKey(action.reindeer) && check.score < newScore)) {
        continue
      }
      if (map[action.reindeer.y][action.reindeer.x] === 'E') {
        best = Math.min(best, newScore)
        continue
      }
      toCheck.push({ on: action.reindeer, score: newScore })
    }
  }
  return best
}

export function part2(input: string) {
  const { map, start } = getMap(input)
  const visited = new Map<string, number>()
  visited.set(stateAsKey(start), 0)
  const toCheck = [{ on: start, score: 0, trail: [start] }]
  let best = Infinity
  const partOfBest = new Set<string>()
  while (true) {
    if (toCheck.length === 0) break
    const next = toCheck.sort((a, b) => b.score - a.score).pop()!
    if (next.score > best) {
      continue
    }
    visited.set(stateAsKey(next.on), next.score)
    const actions = nextOptions(next.on)
    for (const action of actions) {
      const newScore = next.score + action.addedScore
      if (map[action.reindeer.y][action.reindeer.x] === '#') {
        continue
      }
      if (visited.has(stateAsKey(action.reindeer)) && visited.get(stateAsKey(action.reindeer))! < newScore) {
        continue
      }
      if (toCheck.some((check) => stateAsKey(check.on) === stateAsKey(action.reindeer) && check.score < newScore)) {
        continue
      }
      if (map[action.reindeer.y][action.reindeer.x] === 'E') {
        best = Math.min(best, newScore)
        ;[...next.trail, action.reindeer].forEach((r) => partOfBest.add(`${r.x},${r.y}`))
        continue
      }
      toCheck.push({ on: action.reindeer, score: newScore, trail: [...next.trail, action.reindeer] })
    }
  }
  return partOfBest.size
}

function getMap(input: string): Maze {
  const map = input.split('\n')
  const reindeerY = map.findIndex((line) => line.includes('S'))
  const reindeerX = map[reindeerY].indexOf('S')
  const goalY = map.findIndex((line) => line.includes('E'))
  const goalX = map[goalY].indexOf('E')
  return {
    map,
    start: { x: reindeerX, y: reindeerY, direction: '>' },
    goal: { x: goalX, y: goalY },
  }
}

function stateAsKey(reindeer: Reindeer) {
  return `${reindeer.x},${reindeer.y}:${reindeer.direction}`
}

function nextOptions(reindeer: Reindeer): { reindeer: Reindeer; addedScore: number }[] {
  const turns: ('^' | '>' | 'v' | '<')[] = []
  if (reindeer.direction === '^' || reindeer.direction === 'v') {
    turns.push('>', '<')
  }
  if (reindeer.direction === '<' || reindeer.direction === '>') {
    turns.push('^', 'v')
  }
  if (reindeer.direction === '>') {
    return [
      { reindeer: { x: reindeer.x + 1, y: reindeer.y, direction: reindeer.direction }, addedScore: 1 },
      ...turns.map((t) => ({ reindeer: { x: reindeer.x, y: reindeer.y, direction: t }, addedScore: 1000 })),
    ]
  }
  if (reindeer.direction === '<') {
    return [
      { reindeer: { x: reindeer.x - 1, y: reindeer.y, direction: reindeer.direction }, addedScore: 1 },
      ...turns.map((t) => ({ reindeer: { x: reindeer.x, y: reindeer.y, direction: t }, addedScore: 1000 })),
    ]
  }
  if (reindeer.direction === '^') {
    return [
      { reindeer: { x: reindeer.x, y: reindeer.y - 1, direction: reindeer.direction }, addedScore: 1 },
      ...turns.map((t) => ({ reindeer: { x: reindeer.x, y: reindeer.y, direction: t }, addedScore: 1000 })),
    ]
  }
  if (reindeer.direction === 'v') {
    return [
      { reindeer: { x: reindeer.x, y: reindeer.y + 1, direction: reindeer.direction }, addedScore: 1 },
      ...turns.map((t) => ({ reindeer: { x: reindeer.x, y: reindeer.y, direction: t }, addedScore: 1000 })),
    ]
  }
  throw new Error('')
}
